# AVOP Study Practice

A static, responsive one-page study app built from the supplied AVOP materials. It currently includes:

- Five deterministic multiple-choice sets with 25 questions per set, drawn from a 61-question bank. Every set mixes rule recall, operational scenarios, list selection, fill-in-the-blank prompts, "all of the above" choices, and three image-identification questions.
- A 27-item August 2026 picture quiz with a carousel, searchable magnet tray, and scoring after every label is placed.
- A typed-answer **D** map quiz covering all 85 blanks on the August 2026 testing map.
- A separate typed-answer **D/A August** map quiz covering its 53 taxiway, road, helipad, apron, and run-up labels.
- Mobile map zoom controls with two-finger pinch, zoom in, zoom out, and fit-to-screen views contained inside each map frame.
- A complete **Study** reference showing all 27 picture labels, all 61 question-bank answers, and both labeled answer maps.
- A floating suggestion assistant that sends structured question additions and improvement ideas to the GitHub review inbox.
- Private, cookie-free usage benchmarks for visits, section use, completion rates, score bands, device types, and referrers; no answers or suggestion text are collected.
- Installable offline support that saves every quiz, picture, map, answer reference, and Driving Exam card after an online visit.
- A 42-card **Driving Exam** trainer covering all nine Aprons, required definitions, lines and markings, signs, controlled and uncontrolled taxiways, safety rules, and practical-test preparation. Users reveal the ATD answer and save a self-rating on their device.

Multiple-choice answers are scored only after all 25 questions are complete. Incorrect answers can then be reviewed one at a time.

## Offline use

Open the public app once with an internet connection and wait for **Ready for
offline use** in the Study tab. The browser then keeps the full practice app on
the device. Installing it from that card or the browser's **Add to Home Screen**
menu is optional, but provides an app icon and standalone window. Analytics and
the GitHub suggestion form require a connection; all study activities work
offline.

## Preview locally

Open `dist/index.html` in a browser, or serve the `dist` folder with any local static web server.

## Publish with GitHub Pages

1. Create a GitHub repository and push this project to its `main` or `master` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. The included workflow will publish the contents of `dist`. The public link appears in the workflow summary and in **Settings → Pages** after deployment.

No server, database, package installation, or API key is required.

## Future ATD and map updates

Attach the replacement PDFs to the Codex task and identify which edition they replace. The app keeps stable public asset paths, while all visible edition names are centralized in `dist/content-config.js`.

See [UPDATING.md](UPDATING.md) for the upload checklist and verification process.

See [SUGGESTIONS.md](SUGGESTIONS.md) for the question-review and owner-approval workflow.

See [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the applied Vibecoder security review, remediations, residual platform limitation, and automated security gate.
