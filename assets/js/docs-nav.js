let docsNav = [];

/* Load navigation index */
async function loadDocsIndex() {
  const res = await fetch("assets/json/docs-index.json");
  const data = await res.json();

  docsNav = [];

  /* Flatten projects */
  for (const project in data.projects) {
    docsNav = docsNav.concat(data.projects[project]);
  }

  /* Add internal docs */
  docsNav = docsNav.concat(data.internal);
}

/* Render Previous / Next */
function renderPrevNext(currentFile) {
  const nav = document.getElementById("docs-nav");
  if (!nav) return;

  const index = docsNav.indexOf(currentFile);
  if (index === -1) return;

  let html = '<div class="prev-next">';

  if (index > 0) {
    html += `<a class="prev" data-file="${docsNav[index - 1]}">← Previous</a>`;
  }

  if (index < docsNav.length - 1) {
    html += `<a class="next" data-file="${docsNav[index + 1]}">Next →</a>`;
  }

  html += '</div>';
  nav.innerHTML = html;

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      const file = this.getAttribute("data-file");
      window.location.hash = file;
    });
  });
}

async function buildSidebar() {
  const res = await fetch("assets/json/docs-index.json");
  const data = await res.json();

  let hash = window.location.hash.substring(1);
  let html = "";

  if (hash.startsWith("projects/internal/")) {
      html += `<div class="sidebar-title">Internal</div><ul>`;

      data.internal.forEach(file => {
          const name = file.split("/").pop().replace(".md", "");
          html += `<li><a href="#${file}">${name}</a></li>`;
      });

      html += "</ul>";
  } else {
      for (const project in data.projects) {
          const title = project.replace(/-/g, " ");
          html += `<div class="sidebar-title">${title}</div><ul>`;

          data.projects[project].forEach(file => {
              const name = file.split("/").pop().replace(".md", "");
              html += `<li><a href="#${file}">${name}</a></li>`;
          });

          html += "</ul>";
      }
  }

  document.getElementById("docs-sidebar-nav").innerHTML = html;
}

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
    if (!item.endsWith(".md")) {
      path += "/";
    }
    html += `<li><a href="#${path}">${item.replace(".md","")}</a></li>`;
  });

  html += `</ul>`;

  content.innerHTML = html;
}