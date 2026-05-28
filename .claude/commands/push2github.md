You are preparing to push this project to GitHub safely. Follow every step below in order — do not skip any.

## Step 1 — Secret Scan

Before touching git, scan the working tree for secrets and sensitive values.

Search ALL files (excluding .git/, node_modules/) for any of the following patterns:
- Bare API keys or tokens: long random alphanumeric strings, anything that looks like `sk-`, `pk_`, `ghp_`, `xox`, `AKIA`, `Bearer `
- Passwords or secrets in config files: `password =`, `secret =`, `token =`, `api_key =`
- Private keys or certs: `-----BEGIN`, `.pem`, `.p12`, `.key`
- `.env` files containing real values (not placeholders)
- Email addresses that are real (not placeholder like `your-email@example.com`)

If ANY real secret is found:
1. Tell the user exactly which file and line it appears on
2. Ask them to remove or replace it with a placeholder BEFORE continuing
3. Stop — do not proceed to git commands until the user confirms it is clean

If the scan is clean, explicitly confirm: "Secret scan passed — no sensitive values detected."

## Step 2 — Audit Staged Changes

Run `git status` and `git diff HEAD` to review all pending changes.

Check that no secrets, credentials, or personal data snuck in via the diff itself. Report a short summary of what changed (new files, modified files).

## Step 3 — Update README.md

Read the current `README.md` (if it exists). Then read the current state of the codebase to understand:
- What the project is and does
- Live URL (check for a GitHub Pages link or any deployed URL in the code/config)
- How to run it locally
- Sections / features present
- Any setup steps required (e.g. FormSubmit email replacement, env vars)
- Tech stack
- Deployment method

Rewrite or update `README.md` so it accurately reflects the current state of the project. Keep it concise — no padding, no obvious advice. Do not invent features that are not in the code.

## Step 4 — Commit Everything

Stage all changed and untracked files EXCEPT:
- `.env`, `.env.*` files
- Any file containing a real secret found in Step 1
- Files listed in `.gitignore`

Write a clear, factual commit message describing what changed. Format:
```
<short summary line>

<optional bullet list of notable changes if more than one thing changed>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

## Step 5 — Push to GitHub

Run `git push origin main` (or the current branch if not on main).

Confirm the push succeeded and show the remote URL.

## Step 6 — Update GitHub Repo About (description + topics)

First check if the `gh` CLI is available by running `gh --version`.

**If `gh` is available:** use it to update the repository metadata:
1. Read the project to derive a one-sentence description (max 350 chars) that accurately describes what the site/app is.
2. Derive relevant topic tags (lowercase, hyphen-separated, max 20 tags) from the tech stack and purpose — e.g. `html`, `css`, `javascript`, `static-site`, `asset-management`, `github-pages`.
3. Run:
   ```
   gh repo edit --description "<description>" --add-topic <topic1> --add-topic <topic2> ...
   ```
4. Confirm success.

**If `gh` is NOT available:** tell the user it is not installed and provide:
- The description text you derived (ready to paste)
- The topic tags list (ready to paste)
- Instructions: go to the repo on GitHub → click the gear icon next to "About" → paste description and topics there.
- Optional install note: `winget install --id GitHub.cli` (Windows) or `brew install gh` (macOS).

## Step 7 — Final Report

Print a concise summary:
- Secret scan result
- Files committed
- Push status and remote URL
- Repo About update status
- Any items the user still needs to action manually (e.g. replacing placeholder email)
