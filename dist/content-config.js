// Update these values whenever a new ATD or map edition is supplied.
// Keep the image filenames stable so existing links and the Pages workflow do not change.
const AVOP_CONTENT = Object.freeze({
  atdEdition: "August 2026",
  dMapEdition: "August 2026",
  daMapEdition: "April 2026",
});

function applyContentEditionLabels() {
  const daShortEdition = AVOP_CONTENT.daMapEdition.replace(/\s+\d{4}$/, "");
  const daName = `D/A ${daShortEdition}`;

  document.querySelector("#da-map-heading").textContent = `${daName} map practice`;
  document.querySelector("#da-map-results-heading").textContent = `${daName} map complete`;
  document.querySelector("#content-editions").textContent =
    `ATD: ${AVOP_CONTENT.atdEdition} · D map: ${AVOP_CONTENT.dMapEdition} · D/A map: ${AVOP_CONTENT.daMapEdition}`;
}

document.addEventListener("DOMContentLoaded", applyContentEditionLabels);
