"use strict";

function renderGallery() {
  const galleryContainer = document.getElementById("gallery");
  const images = [
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
  ];
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.style.width = (gElCanvas.width / 2) + 'px';
    imgElement.style.height = (gElCanvas.height / 2) + 'px';
    imgElement.style.marginRight = '10px';
    galleryContainer.appendChild(imgElement);
  });
}
