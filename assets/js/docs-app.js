/* Load Docs Index */
async function loadDocsIndex() {
  const res = await fetch("assets/json/docs-index.json");
  window.docsIndex = await res.json();
}

/* Build Sidebar */
async function buildSidebar() {
  const data = window.docsIndex;
  let html = "";

  for (const project in data.projects) {
    const title = project.replace(/-/g, " ");
    html += `<div class="sidebar-group">`;
    html += `<div class="sidebar-title">${title}</div>`;
    html += `<ul>`;

    data.projects[project].forEach(file => {
      const name = file.split("/").pop().replace(".md", "");
      html += `<li><a href="#${file}">${name}</a></li>`;
    });

    html += `</ul></div>`;
  }

  html += `<div class="sidebar-group">`;
  html += `<div class="sidebar-title">Internal</div><ul>`;

  data.internal.forEach(file => {
    const name = file.split("/").pop().replace(".md", "");
    html += `<li><a href="#${file}">${name}</a></li>`;
  });

  html += `</ul></div>`;

  document.getElementById("docs-sidebar-nav").innerHTML = html;
}

/* Remove manual TOC */
function removeManualTOC(markdown) {
  const lines = markdown.split("\n");
  let result = [];
  let skip = false;

  for (let line of lines) {
    const lower = line.toLowerCase().trim();

    if (lower.startsWith("## table of contents") ||
        lower.startsWith("# table of contents")) {
      skip = true;
      continue;
    }

    if (skip && line.startsWith("#")) {
      skip = false;
    }

    if (!skip) result.push(line);
  }

  return result.join("\n");
}

/* Load Markdown */
async function loadMarkdown(file) {
  if (!file) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error("File not found");

    let text = await res.text();

    marked.setOptions({
      breaks: true,
      gfm: true
    });

    text = removeManualTOC(text);

    const html = marked.parse(text);
    document.getElementById("doc-content").innerHTML = html;

    window.scrollTo(0, 0);

    renderBreadcrumb(file);
    buildTOC();
    initScrollSpy();
    addHeadingAnchors();

  } catch (err) {
    document.getElementById("doc-content").innerHTML =
      "<p>Failed to load document.</p>";
    console.error(err);
  }
}

/* Folder View */
function showFolder(folder) {
  const data = window.docsIndex;
  const content = document.getElementById("doc-content");

  let items = new Set();

  function collect(files) {
    files.forEach(file => {
      if (file.startsWith(folder)) {
        let remaining = file.replace(folder, "");
        let firstPart = remaining.split("/")[0];
        items.add(firstPart);
      }
    });
  }

  for (const project in data.projects) {
    collect(data.projects[project]);
  }

  if (data.internal) {
    collect(data.internal);
  }

  let html = `<h1>${folder}</h1>`;
  html += `<ul class="folder-list">`;

  items.forEach(item => {
    let path = folder + item;
    if (!item.endsWith(".md")) path += "/";
    html += `<li><a href="#${path}">${item.replace(".md","")}</a></li>`;
  });

  html += `</ul>`;
  content.innerHTML = html;
}

/* Init Docs */
async function initDocs() {
  await loadDocsIndex();
  await buildSidebar();

  let hash = window.location.hash.substring(1);

  if (!hash) {
    hash = "README.md";
    window.location.hash = hash;
    return;
  }

  let file = hash;
  let section = null;

  const index = hash.indexOf("#");
  if (index !== -1) {
    file = hash.substring(0, index);
    section = hash.substring(index + 1);
  }

  if (file.endsWith("/")) {
    showFolder(file);
    return;
  }

  await loadMarkdown(file);
  renderPrevNext(file);

  if (section) {
    setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView();
    }, 100);
  }
}

window.addEventListener("load", initDocs);
window.addEventListener("hashchange", initDocs);