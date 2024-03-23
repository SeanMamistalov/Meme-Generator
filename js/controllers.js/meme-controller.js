"use strict";

let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  drawImg();
  renderMeme();
  renderGallery();
}

function renderMeme() {
  drawImg();
  drawText();
  updateControlBoxes();
}

function drawImg() {
  let imgData = getMemes();
  let img = new Image();
  img.src = `./memes/${imgData.selectedImgId}.png`;
  img.onload = () => {
    resizeCanvas(img);
    window.removeEventListener("resize", () => resizeCanvas(img));
    drawText();
  };
}

function resizeCanvas(img) {
  if (!gElCanvas.width || !gElCanvas.height) {
    const elContainer = document.querySelector(".meme-canvas");
    gElCanvas.width = elContainer.clientWidth;
    gElCanvas.height = elContainer.clientHeight;
  }
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText() {
  let memeData = getMemes();

  memeData.lines.forEach((line, index) => {
    let text = line.txt;
    let fontSize = line.size;
    let textColor = line.color;

    gCtx.font = `${fontSize}px Arial`;
    gCtx.textAlign = "center";
    gCtx.fillStyle = textColor;

    let yPos = 40 + index * (fontSize + 20);

    gCtx.fillText(text, gElCanvas.width / 2, yPos);
  });
}

function switchLine() {
  const memeData = getMemes();
  const numLines = memeData.lines.length;
  memeData.selectedLineIdx = (memeData.selectedLineIdx + 1) % numLines;
  renderMeme();
  updateControlBoxes();
}

function updateControlBoxes() {
  const memeData = getMemes();
  const selectedLine = memeData.lines[memeData.selectedLineIdx];

  document.getElementById("text-input").value = selectedLine.txt;
  document.getElementById("color-input").value = selectedLine.color;
}

const textInput = document.getElementById("text-input");
textInput.addEventListener("input", function () {
  onUpdateTxt(this.value);
});

function onUpdateTxt(newText) {
  setLineTxt(newText);
  renderMeme();
}

function onImgSelect(imgId) {
  setImg(imgId);
  renderMeme();
  const canvasContainer = document.getElementById("canvas-container");
  if (canvasContainer) {
    canvasContainer.style.display = "block";
  } else {
    console.error("Canvas container not found!");
  }
}

function onSave() {
  const savedContainer = document.getElementById("saved-container");
  const selectedImgUrl = gImgs[gMeme.selectedImgId - 1].url;
  const img = new Image();
  img.onload = function () {
    const dataUrl = gElCanvas.toDataURL();
    const meme = { selectedImgId: gMeme.selectedImgId, url: dataUrl };
    saveMemeToStorage(meme);
    const savedImg = document.createElement("img");
    savedImg.src = dataUrl;
    savedImg.classList.add("saved-image");
    savedContainer.appendChild(savedImg);
  };
  img.src = selectedImgUrl;
}

function toggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("show");
}

function saveMemeToStorage(meme) {
  let savedMemes = loadFromStorage("canvasDB");

  if (!Array.isArray(savedMemes)) {
    savedMemes = [];
  }

  const selectedImgUrl = meme.url;

  if (!selectedImgUrl) {
    console.error("Image URL not found for selectedImgId:", meme.selectedImgId);
    return;
  }

  const clonedMeme = JSON.parse(JSON.stringify(meme));
  const dataUrl = gElCanvas.toDataURL();
  clonedMeme.url = dataUrl;
  savedMemes.push(clonedMeme);

  saveToStorage("canvasDB", savedMemes);
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadCanvas() {
  const canvas = document.querySelector("canvas");
  const dataUrl = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "My-PokeMeme.png";
  link.click();
}

function onSetFillColor(color) {
  gCtx.fillStyle = color;
}

function increaseFontSize() {
  const meme = getMemes();
  meme.lines[meme.selectedLineIdx].size += 2;
  renderMeme();
}

function decreaseFontSize() {
  const meme = getMemes();
  meme.lines[meme.selectedLineIdx].size -= 2;
  renderMeme();
}

function onDeleteLine(lineIndex) {
  deleteLine(lineIndex);
}
