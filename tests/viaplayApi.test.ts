import viaplayApi from './mocks/viaplayApi.mock';

describe('Viaplay API', () => {
  test('getFromUrl retrieves movie using URL', async () => {
    await expect(viaplayApi.getFromUrl('https://content.viaplay.se/pc-se/film/arrival-2016'))
      .resolves
      .toHaveProperty(['_embedded', 'viaplay:blocks', 0, '_embedded', 'viaplay:product', 'content', 'imdb', 'id'], 'tt2543164');
  })
  test('getImdbIdFromUrl retrieves IMDB ID using URL', async () => {
    await expect(viaplayApi.getImdbIdFromUrl('https://content.viaplay.se/pc-se/film/arrival-2016'))
      .resolves
      .toBe('tt2543164');
  })
})