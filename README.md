# AVOP Study Practice

A static, responsive one-page study app built from the supplied AVOP materials. It currently includes:

- Five deterministic multiple-choice sets with 25 questions per set, drawn from a 60-question bank. Every set mixes rule recall, operational scenarios, list selection, fill-in-the-blank prompts, "all of the above" choices, and three image-identification questions.
- A carousel-based picture quiz with a searchable magnet tray and scoring after every label is placed.
- A typed-answer **D** map quiz covering all 85 blanks on the August 2026 testing map.
- A separate typed-answer **D/A April** map quiz covering its 53 taxiway, road, helipad, apron, and run-up labels.
- Mobile map zoom controls with two-finger pinch, zoom in, zoom out, and fit-to-screen views contained inside each map frame.
- A complete **Study** reference showing all 25 picture labels, all 60 question-bank answers, and both labeled answer maps.

Multiple-choice answers are scored only after all 25 questions are complete. Incorrect answers can then be reviewed one at a time.

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
