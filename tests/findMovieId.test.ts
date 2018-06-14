import { MovieDbApi } from '../src/external/movieDbApi';
import { IHttpClient } from '../src/services/httpClient';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import URL, { UrlWithStringQuery } from 'url';

class MockHttpClient implements IHttpClient {
  get(url, config?: AxiosRequestConfig): AxiosPromise<any> {
    return new Promise((resolve, reject) => {
      const { pathname }: UrlWithStringQuery = URL.parse(url);
      
      if (pathname.endsWith('tt2543164') === false) {
        reject();
      }

      return resolve({
        config: {},
        status: 200,
        statusText: 'OK',
        headers: [],
        data: {
          movie_results: [{ id: 329865 }]
        }
      })
    });
  }
}

const movieDbApi: MovieDbApi = new MovieDbApi(new MockHttpClient());

test('test findMovieId the Movie DB API happy path', () => {
  movieDbApi.findMovieId('tt2543164').then((id: number) => {
    expect(id).toBe(329865);
  });
})