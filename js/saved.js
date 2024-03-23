"use strict";

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
