'use strict'

let gImgs = [
  { id: 1, url: "memes/1.png" },
  { id: 2, url: "memes/2.png" },
  { id: 3, url: "memes/3.png" },
  { id: 4, url: "memes/4.png" },
  { id: 5, url: "memes/5.png" },
  { id: 6, url: "memes/6.png" },
  { id: 7, url: "memes/7.png" },
  { id: 8, url: "memes/8.png" },
  { id: 9, url: "memes/9.png" },
  { id: 10, url: "memes/10.png" },
  { id: 11, url: "memes/11.png" },
  { id: 12, url: "memes/12.png" },
  { id: 13, url: "memes/13.png" },
  { id: 14, url: "memes/14.png" },
  { id: 15, url: "memes/15.png" },
  { id: 16, url: "memes/16.png" },
  { id: 17, url: "memes/17.png" },
  { id: 18, url: "memes/18.png" },
  { id: 19, url: "memes/19.png" },
  { id: 20, url: "memes/20.png" },
]

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "",
      size: 30,
      color: "",
    },
  ],
}

function getMemes() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function setLineTxt(newText) {
  let memeData = getMemes()
  memeData.lines[memeData.selectedLineIdx].txt = newText
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function resizeCanvas(img) {
  if (!gElCanvas.width || !gElCanvas.height) {
    const elContainer = document.querySelector(".meme-canvas")
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
  }
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg() {
  let imgData = getMemes()
  let img = new Image()
  img.src = `./memes/${imgData.selectedImgId}.png`
  img.onload = () => {
    resizeCanvas(img)
    window.removeEventListener("resize", () => resizeCanvas(img))
    drawText()
  }
}

function drawText() {
  let memeData = getMemes()

  memeData.lines.forEach((line, index) => {
    let text = line.txt
    let fontSize = line.size
    let textColor = line.color

    gCtx.font = `${fontSize}px Arial`
    gCtx.textAlign = "center"
    gCtx.fillStyle = textColor

    let yPos = 40 + index * (fontSize + 20)

    gCtx.fillText(text, gElCanvas.width / 2, yPos)

    if (text.trim() !== "") {
      if (index === memeData.selectedLineIdx) {
        gCtx.strokeStyle = "orange"
        gCtx.lineWidth = 2
        gCtx.strokeRect(
          20,
          yPos - fontSize,
          gElCanvas.width - 40,
          fontSize + 10
        )
      }
    }
  })
}

function addNewLine() {
  const meme = getMemes()
  const newLine = {
    txt: "New Line",
    size: 20,
    color: "",
  }
  const insertIndex = meme.selectedLineIdx + 1
  meme.lines.splice(insertIndex, 0, newLine)

  meme.selectedLineIdx = insertIndex
}

function switchLine() {
  const memeData = getMemes()
  const numLines = memeData.lines.length
  memeData.selectedLineIdx = (memeData.selectedLineIdx + 1) % numLines
}

function deleteLine() {
  const memeData = getMemes()

  if (memeData.lines.length > 1) {
    memeData.lines.splice(memeData.selectedLineIdx, 1)

    if (memeData.selectedLineIdx >= memeData.lines.length) {
      memeData.selectedLineIdx = memeData.lines.length - 1
    }
  }
}

function addSticker(imgSrc) {
  const stickerSize = 64 
  const canvasWidth = gElCanvas.width
  const canvasHeight = gElCanvas.height

  const xPos = Math.random() * (canvasWidth - stickerSize) 
  const yPos = Math.random() * (canvasHeight - stickerSize) 

  const sticker = {
    img: new Image(),
    x: xPos,
    y: yPos
  }

  sticker.img.src = 'images/stickers/' + imgSrc
  sticker.img.onload = () => {
    gCtx.drawImage(sticker.img, sticker.x, sticker.y, stickerSize, stickerSize)
  }
}

function downloadCanvas() {
  const canvas = document.querySelector("canvas")
  const dataUrl = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = "My-PokeMeme.png"
  link.click()
}
