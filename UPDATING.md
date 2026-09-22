# Updating the AVOP study app

The simplest update process is to attach the new source files to the Codex task and say which edition they replace. No manual image editing or code changes are required from the owner.

## What to upload

- The newest Airside Traffic Directives PDF when the rules or exam questions change.
- The blank/testing map and its labeled answer map for each affected licence type.
- The desired public tab name when it differs from the edition printed on the map.

A useful request is: “Replace the August 2026 ATD and D map with these files, keep the D/A map unchanged, test the quizzes, and publish the update.”

## What gets updated

1. `dist/content-config.js` — the three edition labels shown publicly.
2. `dist/mcq.js` — questions and answers affected by a new ATD.
3. `dist/assets/avop-testing-map.png` and `dist/assets/avop-training-map.png` — D map images.
4. `dist/map.js` — D map answer key and box positions.
5. `dist/assets/da-april-testing-map.png` and `dist/assets/da-april-training-map.png` — D/A map images.
6. `dist/da-map.js` — D/A answer key and box positions.

The published asset filenames stay stable. This avoids broken links and lets GitHub Pages update automatically after changes are pushed.

## Suggestions submitted through the app

The floating suggestion assistant stores submissions as GitHub Issues. When the
owner asks to update from suggestions, follow [SUGGESTIONS.md](SUGGESTIONS.md):
source-check and deduplicate proposed questions, and request owner approval for
all other changes.

## Required verification before publishing

- All JavaScript files pass syntax checks.
- Each map box selects the intended answer field and typed text appears in that box.
- Dense map areas remain selectable at desktop, tablet, and phone widths.
- Every quiz reaches its score screen only after all answers are completed.
- The GitHub Pages deployment succeeds.
