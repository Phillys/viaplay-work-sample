import movieDbApi from './mocks/movieDbApi.mock';

describe('Movie DB API', () => {
  test('findMovieId finds (Movie DB) ID using IMDB ID', async () => {
    await expect(movieDbApi.findMovieId('tt2543164'))
      .resolves
      .toBe(329865);
  });
  test('getMovieTrailer retrieves trailer', async () => {
    await expect(movieDbApi.getMovieTrailer(329865))
      .resolves
      .toBe('https://youtu.be/tFMo3UJ4B4g');
  });
})