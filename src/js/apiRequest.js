const axios = require('axios').default;

class PixabayAPI {
  constructor(searchQuery) {
    this.BASE_API = 'https://pixabay.com/api/';
    this.API_KEY = '35805038-e4e8ca296dd3f5d333d9e11d2';
    this.searchQuery = searchQuery;
    this.imageType = 'photo';
    this.isSafeSearch = true;
    this.orientationImage = 'horizontal';
    this.numberResults = 40;
    this.page = 1;
  }
  async getRequest() {
    if (this.page * this.numberResults > 480) {
      this.numberResults = 20;
    }
    const response = await axios.get(
      `${this.BASE_API}?key=${this.API_KEY}&q=${this.searchQuery}&image_type=${this.imageType}&safesearch=${this.isSafeSearch}&orientation=${this.orientationImage}&per_page=${this.numberResults}&page=${this.page}`
    );
    return response.data;
  }

  increment() {
    this.page += 1;
  }
}

export { PixabayAPI };
