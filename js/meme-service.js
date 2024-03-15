"use strict";

var gImgs = [{ id: 1, url: "memes/1.jpg", keywords: ["funny", "pikachu"] }];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I Love Pokemon!",
      size: 30,
      color: "yellow",
    },
  ],
};
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getMemes() {
  return gMeme;
}
