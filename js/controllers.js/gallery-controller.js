"use strict";
function renderGallery() {
  const galleryContainer = document.getElementById("gallery");
  const images = getImgs(); 
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.className = "gallery-image";
    imgElement.id = `image-${image.id}`;
    imgElement.style.width = gElCanvas.width / 2 + "px";
    imgElement.style.height = gElCanvas.height / 2 + "px";
    imgElement.style.marginRight = "10px";
    imgElement.addEventListener("click", function () {
      onImgSelect(image.id);
    });

    galleryContainer.appendChild(imgElement);
  });
}
