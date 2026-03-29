const lines = [
  "> Loading documentation...",
  "> Architecture",
  "> API Documentation",
  "> Deployment Guides",
  "> Runbooks",
  "> System Design",
  "> ADR Decisions",
  "> Documentation ready"
];

let lineIndex = 0;
let charIndex = 0;
let currentLine = "";
let isDeleting = false;

const container = document.getElementById("code-animate");

function typeAnimation() {
  if (!container) return;

  currentLine = lines[lineIndex];

  if (!isDeleting) {
    container.innerText = currentLine.substring(0, charIndex++);
    if (charIndex > currentLine.length) {
      isDeleting = true;
      setTimeout(typeAnimation, 1200);
      return;
    }
  } else {
    container.innerText = currentLine.substring(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeAnimation, isDeleting ? 40 : 80);
}

document.addEventListener("DOMContentLoaded", typeAnimation);