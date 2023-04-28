function createMarkUp(data) {
  return data.reduce(
    (
      acc,
      { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
    ) => {
      return (acc += `<div class="photo-card">
  <img class = "img"  src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`);
    },
    ''
  );
}

export { createMarkUp };
