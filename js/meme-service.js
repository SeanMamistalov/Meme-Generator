"use strict";

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "",
      size: 30,
      color: "yellow",
    },
  ],
};
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getMemes() {
  return gMeme;
}

function setLineTxt(newText) {
  let memeData = getMemes();
  memeData.lines[memeData.selectedLineIdx].txt = newText;
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId;
}
