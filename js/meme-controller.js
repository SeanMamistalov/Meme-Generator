"use strict";

let gElCanvas;
let gCtx;

function onInit() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
  renderMeme();
}

function renderMeme() {
  drawImg();
}

function drawImg() {
  let imgData = getImg();
  let img = new Image();
  img.src = `./temp-memes/${imgData.selectedImgId}.jpg`;
  img.onload = () => {
    resizeCanvas(img);
    window.addEventListener("resize", () => resizeCanvas());
  };
}

function resizeCanvas(img) {
  const elContainer = document.querySelector(".meme-canvas");
  gElCanvas.width = elContainer.clientWidth;
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
