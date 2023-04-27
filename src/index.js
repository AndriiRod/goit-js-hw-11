import { PixabayAPI } from './js/requestApi';

const formRef = document.getElementById('search-form');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', searchTest);

async function searchTest(e) {
  e.preventDefault();
  const searchRequest = e.target.searchQuery.value.trim();
  const pixabayApi = new PixabayAPI(searchRequest);
  await pixabayApi.getRequest();
}
