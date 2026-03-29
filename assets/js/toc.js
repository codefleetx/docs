function buildTOC() {
  const toc = document.getElementById("toc");
  if (!toc) return;

  const headings = document.querySelectorAll(
    "#doc-content h1, #doc-content h2, #doc-content h3"
  );

  let html = "";
  const file = window.location.hash.substring(1).split("#")[0];

  headings.forEach(h => {
    const id = h.innerText.toLowerCase().replace(/[^\w]+/g, "-");
    h.id = id;

    html += `<a class="toc-${h.tagName.toLowerCase()}" 
               href="#${file}#${id}">
               ${h.innerText}
             </a>`;
  });

  toc.innerHTML = html;
}

/* Scroll spy */
function initScrollSpy() {
  const links = document.querySelectorAll("#toc a");

  window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("#doc-content h1, h2, h3").forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

function addHeadingAnchors() {
  const headings = document.querySelectorAll(
    "#doc-content h1, #doc-content h2, #doc-content h3"
  );

  const file = window.location.hash.substring(1).split("#")[0];

  headings.forEach(h => {
    const anchor = document.createElement("a");
    anchor.href = `#${file}#${h.id}`;
    anchor.className = "heading-anchor";
    anchor.innerText = " 🔗";
    h.appendChild(anchor);
  });
}

function removeManualTOC(markdown) {
  const lines = markdown.split("\n");
  let result = [];
  let skip = false;

  for (let line of lines) {
    const lower = line.toLowerCase().trim();

    /* Start skipping when TOC heading found */
    if (lower.startsWith("## table of contents") ||
        lower.startsWith("# table of contents")) {
      skip = true;
      continue;
    }

    /* Stop skipping when next heading appears */
    if (skip && line.startsWith("#")) {
      skip = false;
    }

    if (!skip) {
      result.push(line);
    }
  }

  return result.join("\n");
}