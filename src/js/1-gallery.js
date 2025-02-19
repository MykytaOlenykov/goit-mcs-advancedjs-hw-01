import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import images from '../db/images.json';
import '../css/1-gallery.css';

const galleryRef = document.querySelector('.gallery');

galleryRef.innerHTML = images.map(getGalleryItemMarkup).join('');

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

function getGalleryItemMarkup({ preview, original, description }) {
  return `
        <li class="gallery-item">
            <a class="gallery-link" href="${original}">
                <img
                  class="gallery-image"
                  src="${preview}"
                  alt="${description}"
                />
            </a>
        </li>
    `;
}
