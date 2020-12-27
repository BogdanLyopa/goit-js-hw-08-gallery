import galleryItems from "./gallery-items.js";

const gallery = document.querySelector("ul.js-gallery");
const lightboxImg = document.querySelector(".lightbox__image");
const lightbox = document.querySelector(".js-lightbox");
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");

gallery.addEventListener("click", onOpenModal);
closeBtn.addEventListener("click", onCloseModal);
overlay.addEventListener("click", onOverlayClick);

const createItem = (galleryItem) => {
  const itemRef = document.createElement("li");
  const linkRef = document.createElement("a");
  const imgRef = document.createElement("img");
  const { preview, original, description } = galleryItem;

  itemRef.classList.add("gallery__item");
  linkRef.classList.add("gallery__link");
  imgRef.classList.add("gallery__image");
  linkRef.href = original;
  imgRef.dataset.source = original;
  imgRef.src = preview;
  imgRef.alt = description;

  gallery.append(itemRef);
  itemRef.append(linkRef);
  linkRef.append(imgRef);

  return itemRef;
};

const renderListItems = (array) => {
  const items = array.map((item) => createItem(item));
  gallery.append(...items);
};

renderListItems(galleryItems);

function onOpenModal(event) {
  event.preventDefault();
  window.addEventListener("keydown", onPressEscape);

  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightbox.classList.add("is-open");
  lightboxImg.src = event.target.dataset.source;
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressEscape);
  lightbox.classList.remove("is-open");
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
