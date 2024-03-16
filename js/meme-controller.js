"use strict";

let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  onSetFillColor("lightblue");
  drawImg();
  renderMeme();
  renderGallery();
}

function renderMeme() {
  drawImg();
  drawText();
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
  let text = memeData.lines[memeData.selectedLineIdx].txt;
  let fontSize = memeData.lines[memeData.selectedLineIdx].size;
  let textColor = memeData.lines[memeData.selectedLineIdx].color;

  gCtx.fillStyle = textColor;
  gCtx.font = `${fontSize}px Arial`;
  gCtx.textAlign = "center";
  gCtx.fillText(text, gElCanvas.width / 2, 40);
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
  document.getElementById("canvas-container").style.display = "block";
}

function onSave() {
  saveToStorage("canvasDB", gElCanvas.toDataURL());
}

function onLoad() {
  const savedImageData = loadFromStorage("canvasDB");
  if (savedImageData) {
    const img = new Image();
    img.onload = function () {
      gCtx.drawImage(img, 0, 0);
    };
    img.src = savedImageData;
  }
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function downloadCanvas(elMeme, filename) {
  elMeme.download = filename;

  const dataUrl = gElCanvas.toDataURL();
  elMeme.href = dataUrl;
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
