'use strict'

function increaseFontSize() {
  const meme = getMemes()
  meme.lines[meme.selectedLineIdx].size += 2
}

function decreaseFontSize() {
  const meme = getMemes()
  meme.lines[meme.selectedLineIdx].size -= 2
}

function onIncFontSize() {
  increaseFontSize()
  renderMeme()
}
function onDecFontSize() {
  decreaseFontSize()
  renderMeme()
}
