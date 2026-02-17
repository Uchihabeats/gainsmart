---
name: unit-test-and-bitbucket-pr
description: Run unit tests and create/push pull requests to Bitbucket. Use when the user asks to run tests, write or run unit tests, push a PR, create a pull request in Bitbucket, open a PR on Bitbucket, or add a screenshot of unit test results to a PR.
---

# Unit Testing and Bitbucket PR

## When to Use

- User wants to run unit tests or add/fix tests
- User wants to push code and open a PR on Bitbucket
- User says "run tests and push PR" or similar

---

## Part 1: Unit Testing

### Detect test stack

- **JavaScript/TypeScript (Vite/React/Node)**: Look for `vitest`, `jest`, or `@testing-library` in `package.json`. Default to Vitest for Vite projects.
- **Python**: Look for `pytest`, `unittest`; check `pyproject.toml`, `setup.cfg`, or `pytest.ini`.
- **Other**: Check root config files and `scripts` in `package.json` or equivalent.

### Run tests

**npm/yarn/pnpm (JS/TS):**

```bash
# Common script names
npm test
# or
npm run test
# or
npx vitest run
npx jest
```

If no test script exists, add one (e.g. Vitest for Vite):

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Then in `package.json`:

```json
"scripts": {
  "test": "vitest run"
}
```

**Python:**

```bash
pytest
# or
python -m pytest
# or
python -m unittest discover
```

### Before pushing

1. Run the full test suite; **do not push if tests fail** unless the user explicitly asks to push anyway.
2. Fix failing tests or report failures clearly.

---

## Part 2: Push and open PR on Bitbucket

### Workflow

1. **Branch**
   - Create a feature branch if not already on one: `git checkout -b feature/your-feature-name` or `git switch -c feature/your-feature-name`.
   - Use short, kebab-case names (e.g. `fix/login-validation`, `feat/add-dashboard`).

2. **Stage and commit**
   - `git add .` or add specific files.
   - Commit with a clear message: `git commit -m "feat: add unit tests for AuthService"`.

3. **Push to Bitbucket**
   - First push: `git push -u origin <branch-name>`.
   - Later pushes: `git push`.

4. **Open Pull Request**
   - Bitbucket does not have a single CLI like `gh pr create`. After push, the terminal often prints a URL to create a PR, e.g.:
     `https://bitbucket.org/<workspace>/<repo>/pull-requests/new?source=<branch>`
   - Tell the user to open that URL, or construct it from the remote:
     - Get remote: `git remote get-url origin`
     - Typical Bitbucket: `https://bitbucket.org/<workspace>/<repo>.git`
     - New PR page: `https://bitbucket.org/<workspace>/<repo>/pull-requests/new?source=<branch-name>`
   - If the repo uses `origin` and the branch is pushed, the user can also go to the repo in Bitbucket and use "Create pull request" from the branch.

### Add unit test screenshot or output to the PR

Yes. Bitbucket supports images and code blocks in the PR description and in comments.

**Option A – Screenshot**
1. Run the test suite in the terminal (or open an HTML report if the project has one).
2. Take a screenshot of the passing test output (terminal or report).
3. In the Bitbucket PR: when editing the description or adding a comment, paste the image (Ctrl+V / Cmd+V) or drag-and-drop. Bitbucket will upload and embed it.

**Option B – Saved terminal output (no screenshot)**
- Run tests and redirect output to a file, then paste into the PR description in a code block:

```bash
npm test 2>&1 | tee test-output.txt
```

- In the PR description, add a section like `## Test results` and paste the contents of `test-output.txt` inside a ` ``` ` code block (syntax `text` or `bash`).

**Option C – HTML report (if available)**
- If the project uses an HTML reporter (e.g. `vitest-html-reporter`, `jest-html-reporter`), generate the report, open it in a browser, then screenshot the summary and attach it to the PR description or first comment.

**Where to put it:** PR description (e.g. "## Test results") or the first PR comment. Use a clear heading like "Unit test results" so reviewers see it.

### Checklist before suggesting "create PR"

- [ ] Unit tests run and pass (or user accepted pushing despite failures)
- [ ] Changes are committed
- [ ] Branch is pushed to `origin`
- [ ] User is given the Bitbucket PR URL or clear steps to open the PR in the UI

### Optional: commit message style

Prefer conventional commits when the project doesn’t specify otherwise:

- `feat: ...` (feature)
- `fix: ...` (bug fix)
- `test: ...` (tests only)
- `chore: ...` (tooling, config)

---

## Quick reference

| Step            | Command / action                                      |
|----------------|--------------------------------------------------------|
| Run tests (npm)| `npm test` or `npm run test` or `npx vitest run`       |
| Run tests (py) | `pytest` or `python -m pytest`                         |
| New branch     | `git checkout -b feature/name`                        |
| Push branch    | `git push -u origin <branch>`                         |
| Open PR        | Use Bitbucket URL after push or repo "Create PR" UI   |
| Test screenshot| Paste/drag image in PR description or comment; or paste `test-output.txt` in a code block |
