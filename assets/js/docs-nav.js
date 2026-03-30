/* docs-nav.js — Handles only Prev/Next Pagination */
let docsNav = [];

/* Load navigation index (Internal helper for pagination) */
async function loadNavData() {
  const res = await fetch("dist/json/docs-index.pkg");
  const base64 = await res.text();
  const jsonString = atob(base64);
  const data = JSON.parse(jsonString);
  
  docsNav = [];

  /* Flatten projects */
  for (const project in data.projects) {
    docsNav = docsNav.concat(data.projects[project]);
  }

  /* Add internal docs */
  if (data.internal) {
    docsNav = docsNav.concat(data.internal);
  }
}

/* Render Previous / Next Buttons */
async function renderPrevNext(currentFile) {
  const nav = document.getElementById("docs-nav");
  if (!nav) return;

  // Ensure navigation data is loaded if array is empty
  if (docsNav.length === 0) {
    await loadNavData();
  }

  const index = docsNav.indexOf(currentFile);
  if (index === -1) {
    nav.innerHTML = "";
    return;
  }

  let html = '<div class="prev-next">';

  if (index > 0) {
    html += `<a class="prev" href="#${docsNav[index - 1]}">← Previous</a>`;
  }

  if (index < docsNav.length - 1) {
    html += `<a class="next" href="#${docsNav[index + 1]}">Next →</a>`;
  }

  html += '</div>';
  nav.innerHTML = html;
}