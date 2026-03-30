/* Load Docs Index */
async function loadDocsIndex() {
  const res = await fetch('dist/json/docs-index.pkg');
  const base64 = await res.text();
  const jsonString = atob(base64);
  const data = JSON.parse(jsonString);
  console.log("docsIndex:", data);
  window.docsIndex = data;
}

/* Build Sidebar */
async function buildSidebar() {
  const container = document.getElementById("docs-sidebar-nav");
  if (!container) return;

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
  const container = document.getElementById("doc-content");
  if (!container) return;

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
  // Check if we are actually on a documentation page
  if (!document.getElementById("doc-content")) {
    console.log("Not a docs page, skipping initDocs.");
    return; 
  }
  
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
    renderBreadcrumb(file); // <--- Add this line!
    
    // Clear the Prev/Next and TOC since they don't apply to folders
    const navEl = document.getElementById("docs-nav");
    if (navEl) navEl.innerHTML = "";
    
    const tocEl = document.getElementById("toc");
    if (tocEl) tocEl.innerHTML = "";
    
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