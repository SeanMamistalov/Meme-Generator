"use strict";

const gTrans = {
  title: {
    english: "Pokemon Generator",
    hebrew: " ממים",
  },
  gallery: {
    english: "Gallery",
    hebrew: "גלריה",
  },
  saved: {
    english: "Saved",
    hebrew: "שמור",
  },
  about: {
    english: "Saved",
    hebrew: "אודות",
  },
  footer: {
    english: "All Rights Reserved 2024",
    hebrew: "© כל הזכויות שמורות 2024",
  },
  name: {
    english: "Sean Mamistalov",
    hebrew: "שון ממיסטלוב",
  },
  text: {
    english: "Welcome to my meme generators site",
    hebrew: "ברוכים הבאים ליצירת מימז בסגנון פוקימון",
  },
};

function getTrans(transKey) {
  const transMap = gTrans[transKey];
  if (!transMap) return "UNKNOWN";
  let transTxt = transMap[gCurrLang];
  if (!transTxt) transTxt = transMap.en;
  return transTxt;
}

function doTrans() {
  const els = document.querySelectorAll("[data-trans]");
  els.forEach((el) => {
    const transKey = el.dataset.trans;
    const transTxt = getTrans(transKey);
    if (el.placeholder) el.placeholder = transTxt;
    else el.innerText = transTxt;
  });
}

var gCurrLang = "english";

function setLang(lang) {
  gCurrLang = lang;
}

function onSetLang(lang) {
  setLang(lang);
  doTrans();
}
