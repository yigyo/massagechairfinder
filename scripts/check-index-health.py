#!/usr/bin/env python3
"""Guard: is the REAL .git/index safe to commit from?

WHY THIS EXISTS (2026-09-01). The publish workflow uses an isolated
GIT_INDEX_FILE and never touches .git/index. That keeps OUR commits correct, and
it is also why nothing ever inspected the real index. On 2026-09-01 an attended
session found .git/index holding a snapshot roughly three weeks stale: it staged
DELETIONS of public/llms.txt, the IndexNow key file, scripts/indexnow-ping.py,
scripts/build-content-revisions.py, components/YouTubeShort.tsx and
lib/content-revisions.json, and it would have reverted lib/local-articles.ts by
2,371 lines. Every one of those files existed on disk and in HEAD. A single
plain `git commit` would have shipped all of it.

The documented advice was "git status noise on this mount is benign". It stopped
being benign and nothing was watching, because the workflow routed around the
index instead of checking it.

Run this at the START of every operator run, and before any hand commit:

    python3 scripts/check-index-health.py

Exit 0 = the real index matches HEAD and a plain commit is safe.
Exit 1 = the index is dirty. Do NOT commit without a pathspec. Repair with:

    git read-tree HEAD          # then re-run this script

If a .git/index.lock corpse blocks that, RENAME it aside (unlink is blocked on
this FUSE mount, delete will fail):

    mv .git/index.lock .git/zz-lock-quarantine/
"""
import os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def git(*args):
    env = dict(os.environ)
    env.pop("GIT_INDEX_FILE", None)          # always inspect the REAL index
    p = subprocess.run(["git"] + list(args), cwd=ROOT, env=env,
                       capture_output=True, text=True)
    return p.returncode, p.stdout.strip(), p.stderr.strip()


def main():
    problems = []

    code, staged, err = git("diff", "--cached", "--name-status", "HEAD")
    if code != 0:
        print("FAIL: could not read the index: %s" % (err or "unknown error"))
        return 1

    if staged:
        rows = [r.split("\t") for r in staged.splitlines() if r.strip()]
        dels = [r[-1] for r in rows if r[0].startswith("D")]
        mods = [r[-1] for r in rows if not r[0].startswith("D")]
        problems.append("%d file(s) staged against HEAD in the REAL index" % len(rows))
        if dels:
            problems.append("STAGED DELETIONS (%d), these files would be removed "
                            "from the repo by a plain commit:" % len(dels))
            for f in dels:
                on_disk = os.path.exists(os.path.join(ROOT, f))
                problems.append("    %s%s" % (f, "   [STILL ON DISK]" if on_disk else ""))
        if mods:
            problems.append("staged modifications (%d): %s%s"
                            % (len(mods), ", ".join(mods[:8]),
                               " ..." if len(mods) > 8 else ""))

    locks = []
    for base, _dirs, files in os.walk(os.path.join(ROOT, ".git")):
        if "zz-lock-quarantine" in base:
            continue
        locks.extend(os.path.relpath(os.path.join(base, f), ROOT)
                     for f in files if f.endswith(".lock"))
    if locks:
        problems.append("%d git lock corpse(s), these block the NEXT git command: %s"
                        % (len(locks), ", ".join(locks[:6])))

    if not problems:
        print("index health OK: the real .git/index matches HEAD, no lock corpses.")
        return 0

    print("INDEX HEALTH FAIL")
    for line in problems:
        print("  " + line)
    print("")
    print("  Do NOT run a bare `git commit` or `git commit -a` in this state.")
    print("  Repair:  git read-tree HEAD    (then re-run this script)")
    print("  Locks:   mv .git/index.lock .git/zz-lock-quarantine/   (unlink is blocked here)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
