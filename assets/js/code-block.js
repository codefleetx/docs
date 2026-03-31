const docLines = [
  { text: "> Initializing Documentation Engine...", type: "system" },
  { text: "> Loading project manifests...", type: "system" },
  { text: "✓ Found 121 Markdown files in /architecture", type: "success" },
  { text: "✓ Found 354 API endpoints in /apidocs", type: "success" },
  { text: "> Generating Table of Contents...", type: "process" },
  { text: "✓ Stylesheets optimized and bundled.", type: "success" },
  { text: "> Building Search Index...", type: "process" },
  { text: "✓ 248 items indexed successfully.", type: "success" },
  { text: "> Documentation Ready at:", type: "ready" },
  { text: "https://docs.djangoplay.org", type: "link" }
];

let lineIdx = 0;
let charIdx = 0;
const container = document.getElementById("code-animate");

function typeDocumentation() {
  if (!container || lineIdx >= docLines.length) {
    // Optional: Reset after a long pause to loop the animation
    if (lineIdx >= docLines.length) {
       setTimeout(() => {
         container.innerHTML = "";
         lineIdx = 0;
         charIdx = 0;
         typeDocumentation();
       }, 5000);
    }
    return;
  }

  const currentItem = docLines[lineIdx];
  
  // Create a new line element if we just started this line
  if (charIdx === 0) {
    const lineEl = document.createElement("div");
    lineEl.className = `code-line ${currentItem.type}`;
    container.appendChild(lineEl);
  }

  const currentLineEl = container.lastElementChild;
  currentLineEl.textContent = currentItem.text.substring(0, charIdx + 1);
  charIdx++;

  if (charIdx < currentItem.text.length) {
    // Variable typing speed for realism
    const speed = Math.random() * 30 + 20; 
    setTimeout(typeDocumentation, speed);
  } else {
    // Line finished
    charIdx = 0;
    lineIdx++;
    // Wait longer between lines
    const lineDelay = currentItem.type === "success" ? 400 : 800;
    setTimeout(typeDocumentation, lineDelay);
  }
  
  // Auto-scroll to bottom
  container.scrollTop = container.scrollHeight;
}

document.addEventListener("DOMContentLoaded", typeDocumentation);