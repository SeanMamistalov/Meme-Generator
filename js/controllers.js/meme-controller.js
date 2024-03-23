'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  drawImg()
  renderMeme()
  renderGallery()
}

function renderMeme() {
  drawImg()
  drawText()
}

function onImgSelect(imgId) {
  setImg(imgId)
  renderMeme()
  const canvasContainer = document.getElementById("canvas-container")
  if (canvasContainer) {
    canvasContainer.style.display = "block"
  } else {
    console.error("Canvas container not found!")
  }
}

function onSetFillColor(color) {
  gCtx.fillStyle = color
}
function onToggleMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  mobileMenu.style.display =
    mobileMenu.style.display === "block" ? "none" : "block"
}

function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onDeleteLine(lineIndex) {
  deleteLine(lineIndex)
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  renderMeme()
  updateControlBoxes()
}

function onNewLine() {
  addNewLine()
  renderMeme()
  document.getElementById("text-input").value = ""
}

function onUpdateTxt(newText) {
  setLineTxt(newText)
  renderMeme()
}
function updateControlBoxes() {
  const memeData = getMemes()
  const selectedLine = memeData.lines[memeData.selectedLineIdx]

  document.getElementById("text-input").value = selectedLine.txt
  document.getElementById("color-input").value = selectedLine.color
}

const textInput = document.getElementById("text-input")
textInput.addEventListener("input", function () {
  onUpdateTxt(this.value)
})

function onDownload() {
  downloadCanvas()
}
