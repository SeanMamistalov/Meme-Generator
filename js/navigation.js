"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const galleryNavItem = document.querySelector(".gallery");
  const savedNavItem = document.querySelector(".saved");
  const aboutNavItem = document.querySelector(".about");
  const gallerySection = document.getElementById("gallery");
  const savedSection = document.getElementById("saved-container");
  const aboutSection = document.getElementById("about");
  const canvasContainer = document.getElementById("canvas-container");
  const logoImg = document.querySelector(".logo-img");

  galleryNavItem.addEventListener("click", function (event) {
    event.preventDefault();
    showGallery();
  });

  savedNavItem.addEventListener("click", function (event) {
    event.preventDefault();
    showSavedMemes();
  });

  aboutNavItem.addEventListener("click", function (event) {
    event.preventDefault();
    showAbout();
  });

  logoImg.addEventListener("click", function (event) {
    event.preventDefault();
    showGallery();
  });

  function showGallery() {
    gallerySection.style.display = "block";
    savedSection.style.display = "none";
    aboutSection.style.display = "block";
    canvasContainer.style.display = "none";
  }

  function showSavedMemes() {
    gallerySection.style.display = "none";
    savedSection.style.display = "block";
    aboutSection.style.display = "none";
    canvasContainer.style.display = "none";
  }

  function showAbout() {
    gallerySection.style.display = "none";
    savedSection.style.display = "none";
    aboutSection.style.display = "block";
    canvasContainer.style.display = "none";
  }

  showGallery();
});
