# Vibecoder Security Review: AVOP Study Practice

**Date:** 2026-09-30
**Framework:** [Vibecoder Security Review](https://gist.github.com/logicx24/2a491f29bf662d3e04fe1713b1757729)  
**Scope:** The committed static site, GitHub Pages deployment workflow, and Git history.

## Summary

The application is a static HTML/CSS/JavaScript site hosted by GitHub Pages. It
has no backend, accounts, authentication, database, cookies, or file uploads.
It uses an integrity-pinned GoatCounter analytics script and a same-origin
service worker for offline caching. The review found no committed credentials
or private-key material and no active critical or high-severity vulnerability.

Four hardening findings were corrected:

1. Mutable GitHub Action tags were replaced with immutable 40-character commit
   hashes, and checkout no longer persists credentials.
2. Two `innerHTML` assignments were replaced with DOM creation and
   `textContent` so future data changes cannot turn them into DOM-XSS sinks.
3. A restrictive Content Security Policy and referrer policy were added to the
   public page.
4. Public suggestion fields now have explicit length limits, and all new-window
   links use both `noopener` and `noreferrer`.

## Framework results

### Secrets and keys - Pass

- No `.env`, private-key, API-key, database credential, bearer token, or other
  secret-like value was found in the current tree or Git history.
- `.gitignore` now excludes scratch output, environment files, and common private
  key formats.
- The browser bundle contains no application secret and requires none.

### Authentication and accounts - Not applicable

The app has no login, account, role, session, JWT, cookie, admin route, or
privileged API. GitHub separately authenticates a user who chooses to submit an
Issue; the app never receives that identity or credential.

### User data and privacy - Pass

- No user records, answer text, map entries, or suggestion text are collected by analytics.
- GoatCounter receives anonymous visit, device, referrer, section, completion,
  and score-band events without cookies or a persistent user identifier.
- Driving-card ratings are stored only in the user's browser and contain card IDs
  plus `mastered`/`practice` values.
- Suggestion text is sent to GitHub only after the user selects **Continue to
  GitHub**, reviews the prefilled Issue, and creates it there.

### Test versus production - Pass

No debug route, test account, mock authentication bypass, verbose production
logging, or environment-dependent backdoor exists.

### File uploads - Not applicable

The deployed app has no file input, upload handler, storage bucket, or uploaded
file processor.

### Dependencies and plugins - Pass with constrained runtime dependency

- The only third-party runtime script is GoatCounter v5. Its exact URL and
  SHA-384 integrity hash are enforced in HTML, CSP, and the automated gate.
- All GitHub Actions are pinned to immutable commit hashes.
- Deployment permissions remain limited to repository read, Pages write, and the
  OIDC token required by GitHub Pages.

### Basic hygiene - Pass with one platform limitation

- Production is served over HTTPS by GitHub Pages.
- CSP permits only same-origin code, the integrity-pinned GoatCounter script,
  its exact analytics endpoint, and the same-origin offline service worker.
  Frames, objects, inline script attributes, and insecure requests remain
  blocked. Inline styles remain allowed because map labels and zoom controls
  calculate positions at runtime.
- GitHub Pages does not support repository-configured HTTP response headers, so
  `frame-ancestors`/`X-Frame-Options` cannot be enforced here. Residual
  clickjacking risk is low because the site has no authentication or sensitive
  state-changing operation.

### Injection and code execution - Pass

- User text is never rendered as HTML; DOM output uses `textContent` and created
  elements.
- Suggestion values are encoded with `URL`/`URLSearchParams` and are not executed.
- There is no SQL, template execution, deserialization, `eval`, dynamic
  `Function`, shell command, or LLM integration in the deployed app.

## Automated security gate

`.github/workflows/security-review.yml` runs on every push and pull request. It:

- syntax-checks every JavaScript module;
- scans deployed/configuration text for common credential formats;
- rejects dangerous DOM/code-execution sinks;
- rejects insecure HTTP and remote runtime scripts/styles;
- verifies key CSP directives and safe new-window links;
- requires every GitHub Action to be pinned to a full commit SHA; and
- rejects environment files and common private-key formats.

Run the same gate locally with:

```text
node scripts/security-check.mjs
```

## Future review triggers

Repeat the full framework review if the project adds a backend, authentication,
a database, file uploads, another third-party script, payment handling, or an
AI/LLM integration. Material changes to analytics or offline caching should also
receive a targeted review.
