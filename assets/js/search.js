let searchIndex = [];

async function loadSearchIndex() {
  const res = await fetch("dist/json/search-index.pkg");
  const base64 = await res.text();
  const jsonString = atob(base64);
  const data = JSON.parse(jsonString);
  searchIndex = data;
}

/* Create snippet around matched word */
function createSnippet(content, query) {
  const lowerContent = content.toLowerCase();
  const index = lowerContent.indexOf(query);

  if (index === -1) {
    return content.substring(0, 120);
  }

  let start = Math.max(0, index - 60);
  let end = Math.min(content.length, index + 60);

  let snippet = content.substring(start, end);

  /* Clean markdown */
  snippet = snippet.replace(/[#_*`>-]/g, "");
  snippet = snippet.replace(/\n/g, " ");

  /* Highlight */
  const regex = new RegExp(query, "gi");
  snippet = snippet.replace(regex, match => `<mark>${match}</mark>`);

  return "..." + snippet + "...";
}

/* Main search */
function searchDocs(query) {
  query = query.toLowerCase();
  let results = [];

  searchIndex.forEach(doc => {
    const fileName = doc.file.toLowerCase();
    const title = (doc.title || "").toLowerCase();
    const content = (doc.content || "").toLowerCase();

    let score = 0;

    /* Ranking */
    if (fileName === query) score += 100;
    else if (fileName.includes(query)) score += 70;

    if (title.includes(query)) score += 50;

    const matches = (content.match(new RegExp(query, "g")) || []).length;
    score += matches * 5;

    if (score > 0) {
      results.push({ ...doc, score });
    }
  });

  /* Sort by score */
  results.sort((a, b) => b.score - a.score);

  /* Limit results */
  results = results.slice(0, 15);

  showSearchResults(results, query);
}

/* Group + Render */
function showSearchResults(results, query) {
  const container = document.getElementById("search-results");

  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = "<p>No results found</p>";
    return;
  }

  let grouped = {};

  results.forEach(doc => {
    let parts = doc.file.split("/");
    let group = parts[1] || "common";

    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(doc);
  });

  let html = "";

  for (const group in grouped) {
    html += `<div class="search-group">`;
    html += `<div class="search-group-title">${group}</div>`;

    grouped[group].forEach(doc => {
      let snippet = createSnippet(doc.content, query);

      html += `
        <div class="search-item">
          <a href="view.html#${doc.file}">
            <div class="search-title">${doc.title || doc.file}</div>
            <div class="search-path">${doc.file}</div>
            <div class="search-snippet">${snippet}</div>
          </a>
        </div>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
}

/* Search input */
document.addEventListener("DOMContentLoaded", async () => {
  await loadSearchIndex();

  const input = document.getElementById("docs-search");
  const sidebar = document.getElementById("docs-sidebar-nav");
  const results = document.getElementById("search-results");

  if (!input) return;

  input.addEventListener("input", function () {
    const query = this.value.trim();

    if (query.length < 2) {
      results.innerHTML = "";
      sidebar.style.display = "block";
      return;
    }

    sidebar.style.display = "none";
    searchDocs(query);
  });

  /* Keyboard shortcut "/" to focus search */
  document.addEventListener("keydown", function (e) {
    if (e.key === "/") {
      e.preventDefault();
      input.focus();
    }
  });
});