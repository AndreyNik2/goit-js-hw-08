// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryRef = document.querySelector('.gallery')

const newGalleryElementMarkup = ({ preview, original, description }) => {
    return `<div class="gallery__item">
	<a class="gallery__link" href='${original}'
		><img class="gallery__image" src='${preview}' alt='${description}' data-source='${original}'
	/></a>
</div>`
}
const makeGalleryElements = galleryItems.map(newGalleryElementMarkup).join('')
galleryRef.insertAdjacentHTML('beforeend', makeGalleryElements)

var lightbox = new SimpleLightbox('.gallery a', {
        captionType: 'attr',
        captionsData: 'alt',
        captionDeley: 250,
        fadeSpeed: 250,
    });