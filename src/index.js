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
  const arrayData = data.hits;
  let flag = true;
  if (arrayData.length === 0) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (pixabayApi.page === 1) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  if (data.totalHits === ref.galleryBox.children.length + data.hits.length) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    flag = false;
  }

  renderMarkup(arrayData, flag);
}

function renderMarkup(data, flag) {
  const markup = createMarkUp(data);
  ref.galleryBox.insertAdjacentHTML('beforeend', markup);
  scroll();
  if (flag) ref.loadMore.classList.remove('isHidden');

  console.log(ref.galleryBox.children.length);
  ightbox.refresh();
}

function loadMore() {
  ref.loadMore.classList.add('isHidden');
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
