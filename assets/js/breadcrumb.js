function renderBreadcrumb(path) {
  const container = document.getElementById("breadcrumb");
  if (!container || !path) return;

  const parts = path.split("/");
  let html = `<a href="/">Home</a>`;

  let current = "";

  parts.forEach((part, i) => {
    current += part + "/";
    const name = part
      .replace(".md", "")
      .replace(/-/g, " ");

    html += ` / <a href="#${current}">${name}</a>`;
  });

  container.innerHTML = html;
}