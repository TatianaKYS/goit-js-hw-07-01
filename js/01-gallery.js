import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector(".gallery");

function addGallery(listGallery) {
  return listGallery
    .map(({ preview, original, description }) => {
      return `  <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

gallery.insertAdjacentHTML("afterbegin", addGallery(galleryItems));
gallery.addEventListener("click", handleClick);
let currentTarget = null;
function handleClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  e.preventDefault();

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}">`,
    {
      onShow: () => window.addEventListener("keydown", escapeClose),
      onclose: () => window.removeEventListener("keydown", escapeClose),
    }
  );
  currentTarget = instance;
  instance.show();
}

function escapeClose(e) {
  if (e.code === "Escape") {
    currentTarget.close();
  }
}
