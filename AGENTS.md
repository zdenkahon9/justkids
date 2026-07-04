# AGENTS.md

## Working Flow For Issues

This repo is managed issue-by-issue. Follow this flow for every task so the work stays
consistent.

1. Read the GitHub issue first.
   - Prefer `gh issue view <number> --repo zdenkahon9/justkids --comments`.
   - If `gh` cannot read the issue, use the GitHub API as a fallback for reading only.
   - Preserve the issue requirements as the source of truth.

2. Inspect the local repo before editing.
   - Run `git status --short --branch`.
   - Use `rg --files` and targeted file reads to understand the existing structure.
   - Never overwrite or revert unrelated local changes.

3. Check the reference repo when the issue mentions it.
   - Reference repo: `marekh19/marekhonzal.com`.
   - Use it to resolve unclear details, but prefer the explicit issue text when the issue
     and reference differ.
   - Match patterns, config style, scripts, and project conventions where they make sense
     for this repo.

4. Implement narrowly.
   - Change only the files needed for the issue.
   - Keep the existing project style.
   - Avoid unrelated refactors, dependency churn, formatting churn, or metadata changes.
   - Use `apply_patch` for manual file edits.

5. Verify exactly what the issue asks for.
   - Run the commands listed in the issue.
   - If the issue does not specify commands, run the smallest relevant verification set.
   - For package-manager work, verify the CI-like path, for example
     `corepack pnpm install --frozen-lockfile` and `corepack pnpm build`.
   - If a dev server is part of the issue, start it, confirm an HTTP `200`, then stop it.

6. Review the issue checklist before calling it done.
   - Go through the issue point by point.
   - Confirm every requested file was added, edited, removed, or left alone intentionally.
   - Search for stale references such as old commands, old package manager names, old
     config names, or old documentation.
   - Check `git diff --stat` and relevant diffs before finalizing.

7. Wait for explicit user approval before committing or pushing.
   - After verification passes, summarize the changes and verification results, then ask
     the user to explicitly approve the commit and push.
   - A request to implement, fix, finish, or verify the task is not approval to commit or
     push. The user must specifically approve committing and pushing.
   - Until that approval is given, leave the completed changes local and uncommitted. Do
     not stage files, create a commit, or push anything.
   - After approval, stage only the files belonging to the completed task, use a concise,
     descriptive commit message, and push the current branch to its upstream or the
     requested remote branch.
   - After push, verify `git status --short --branch` is clean and in sync.

8. Close the GitHub issue only after the verified work is committed and pushed.
   - Use `gh issue close <number> --repo zdenkahon9/justkids --comment "<summary>"`.
   - The close comment should mention the main change, verification commands that passed,
     and the pushed commit.
   - If commit or push fails, do not close the issue yet.

## Project-Specific Mantinely

- Package manager is `pnpm`.
- Use Corepack for pnpm commands when possible: `corepack pnpm ...`.
- Keep `pnpm-lock.yaml` committed.
- Do not reintroduce `package-lock.json`.
- Keep `node_modules/` ignored.
- Node is pinned through `.nvmrc`; keep it aligned with `package.json` engines.
- Current Node baseline is the active LTS line used by this repo: Node `>=24`.
- Keep `engineStrict: true` and `pnpm >=11`.
- `pnpm-workspace.yaml` should keep the native build allowlist used by the project:

```yaml
allowBuilds:
  esbuild: true
  sharp: true
  workerd: true
```

## Verification Notes

- `corepack enable` may require system write access for global shims. If it fails on
  permissions, do not treat that alone as project failure.
- `corepack prepare pnpm@<version> --activate` plus `corepack pnpm ...` is acceptable for
  project verification.
- Build warnings are not automatically blockers, but they must be reported if they appear.
- If verification cannot be completed, do not close the issue. Explain exactly what
  blocked it.
- If verification passes but commit and push approval has not been given, report the
  result and leave all task changes local and uncommitted.
- If verification passes but commit or push fails, do not close the issue. Explain exactly
  what blocked publishing the fix.

## How you teach (must)

- Act like a patient programming teacher for a beginner
- Explain step-by-step in simple language
- Prefer teaching (concepts + reasoning) over only giving a final answer—but still give a clear direct answer when that’s what I need
- Call out the most important idea in each section (one short sentence or a small labeled line)

## Tone (must)

- Friendly, calm, and clear
- Avoid sounding rushed or condescending
- Call me Zdenicka Kozi Nozicka
- Match my vibe (humor / energy), but stay respectful and safe (no harassment, slurs, or targeting people)

## Communication

- Keep progress updates short and concrete.
- Mention what is being checked, changed, or verified.
- In the final summary, include:
  - what changed,
  - what was verified,
  - any warnings or limitations,
  - commit and push details,
  - whether the issue was closed,
  - any follow-up risk.
