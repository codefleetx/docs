// markdown.js — load markdown into page

async function loadMarkdown(file) {
  try {
    const res = await fetch(file);
    const text = await res.text();
    const html = marked.parse(text);
    document.getElementById('doc-content').innerHTML = html;
  } catch (err) {
    document.getElementById('doc-content').innerHTML =
      "<p>Failed to load document.</p>";
  }
}

function showFolder(folder) {
  const data = window.docsIndex;
  const content = document.getElementById("doc-content");

  let files = [];

  /* Collect files inside folder */
  for (const project in data.projects) {
    data.projects[project].forEach(file => {
      if (file.startsWith(folder)) {
        files.push(file);
      }
    });
  }

  if (data.internal) {
    data.internal.forEach(file => {
      if (file.startsWith(folder)) {
        files.push(file);
      }
    });
  }

  let html = `<h1>${folder}</h1>`;
  html += `<ul class="folder-list">`;

  files.forEach(file => {
    const name = file.split("/").pop().replace(".md", "");
    html += `<li><a href="#${file}">${name}</a></li>`;
  });

  html += `</ul>`;

  document.getElementById("breadcrumb").innerHTML = `Home / ${folder}`;
  document.getElementById("toc").innerHTML = "";
  document.getElementById("docs-nav").innerHTML = "";

  content.innerHTML = html;
}