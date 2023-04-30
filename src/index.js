import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { PixabayAPI } from './js/apiRequest';
import { createMarkUp } from './js/markupTemplate';
import { ref } from './js/refsFormElement';

ref.form.addEventListener('submit', submitForm);
ref.loadMore.addEventListener('click', loadMore);

let pixabayApi = null;
const ightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function submitForm(e) {
  e.preventDefault();
  ref.galleryBox.innerHTML = '';
  loadMoreIsHidden();
  const searchRequest = e.target.searchQuery.value.trim();
  pixabayApi = new PixabayAPI(searchRequest);
  createRequest();
}

async function createRequest() {
  try {
    const data = await pixabayApi.getRequest();
    checkData(data);
  } catch (error) {
    console.log(error);
  }
}

function checkData(data) {
  if (data.hits.length === 0 || pixabayApi.searchQuery === '') {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (pixabayApi.page === 1) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  renderMarkup(data);
}

function renderMarkup(data) {
  const markup = createMarkUp(data.hits);
  ref.galleryBox.insertAdjacentHTML('beforeend', markup);
  ightbox.refresh();
  scroll();
  console.log(ref.galleryBox.children.length);
  if (data.totalHits <= ref.galleryBox.children.length) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    loadMoreIsHidden();
    return;
  }
  loadMoreShow();
}

function loadMore() {
  pixabayApi.increment();
  createRequest();
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function loadMoreIsHidden() {
  if (ref.loadMore.classList.contains('isHidden')) return;
  ref.loadMore.classList.add('isHidden');
}
function loadMoreShow() {
  ref.loadMore.classList.remove('isHidden');
}
