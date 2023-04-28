// import InfiniteScroll from 'infinite-scroll';

import { PixabayAPI } from './js/requestApi';
import { createMarkUp } from './js/createMarkUp';

const formRef = document.getElementById('search-form');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', createRequest);

async function createRequest(e) {
  e.preventDefault();
  galleryRef.innerHTML = '';
  const searchRequest = e.target.searchQuery.value.trim();
  const pixabayApi = new PixabayAPI(searchRequest);
  try {
    renderMarkup(await pixabayApi.getRequest());
  } catch (error) {
    console.log(error);
  }
}

function renderMarkup(data) {
  const markup = createMarkUp(data);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}
