import gallery from "./gallery-items.js"

const refs = {
gallery: document.querySelector('.js-gallery'),
lightbox: document.querySelector('.lightbox'),
lightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
modal: document.querySelector('.lightbox__image'),
lightbox___img: document.querySelector('.lightbox___image'),

};


const createGalleryItem = ({ preview, original, description }) =>
`<li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;
const galleryMarkup = gallery.reduce((acc, item) => 
acc + createGalleryItem(item),
  ""
);

refs.gallery.insertAdjacentHTML("afterbegin", galleryMarkup);

refs.gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
    event.preventDefault();

    if(event.target.nodeName !== 'IMG') {
        retrun;
    }

    if (event.target.nodeName === 'IMG') {
    
        refs.lightbox.classList.add('is-open');
        refs.lightbox__image.src = event.target.getAttribute("data-source");
        refs.lightbox__image.alt = event.target.alt;
    }
    window.addEventListener('keyup', clickKey);
}

refs.lightboxBtn.addEventListener('click', onCloseClick);

function onCloseClick(event) {
    event.preventDefault();
    refs.lightbox.classList.remove('is-open');
    refs.lightbox___img.src = '';
    refs.lightbox___img.alt = '';
    window.removeEventListener('keyup', clickKey );

}

refs.modal.addEventListener("click", closeLightbox);

function closeLightbox(event) {
    if (event.target === event.currentTarget) {
      onClickHandlerClose();
    }
  }
  
  function clickKey(event) {
    if (event.code === "Escape") {
      onClickHandlerClose();
    }
  }