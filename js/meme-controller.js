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
}

