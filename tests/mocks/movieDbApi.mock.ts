import { MovieDbApi } from '../../src/external/movieDbApi';
import { IHttpClient, IHttpClientPromise, IHttpRequestConfig } from '../../src/services/httpClient';
import URL, { UrlWithStringQuery } from 'url';

function getMockData(url: string) : object|null {
  const { pathname }: UrlWithStringQuery = URL.parse(url);

  switch (pathname) {
    case '/movie/329865/videos':
      return {
        'results': [
          {
            'id': '57aa147c92514111750014eb',
            'iso_639_1': 'en',
            'iso_3166_1': 'US',
            'key': 'gwqSi_ToNPs',
            'name': 'Arrival (2016) - TV Spot - Paramount Pictures',
            'site': 'YouTube',
            'size': 1080,
            'type': 'Teaser'
          },
          {
            'id': '57d93c66c3a36852f4005907',
            'iso_639_1': 'en',
            'iso_3166_1': 'US',
            'key': 'tFMo3UJ4B4g',
            'name': 'Arrival Trailer (2016) - Paramount Pictures',
            'site': 'YouTube',
            'size': 1080,
            'type': 'Trailer'
          },
          {
            'id': '5809330b9251415dfb011c00',
            'iso_639_1': 'en',
            'iso_3166_1': 'US',
            'key': 'WH9F4WkvhRk',
            'name': 'Arrival Official Trailer 2 (2016) - Amy Adams Movie',
            'site': 'YouTube',
            'size': 720,
            'type': 'Trailer'
          }
        ]
      };
    case '/find/tt2543164':
      return { movie_results: [{ id: 329865 }] };
    default:
      return null;
  }
}

class MockHttpClient implements IHttpClient {
  get(url, config?: IHttpRequestConfig): IHttpClientPromise<any> {
    return new Promise((resolve, reject) => {
      const data: object|null = getMockData(url);

      if (data === null) {
        return reject();
      }
    
      resolve({
        config: {},
        status: 200,
        statusText: 'OK',
        headers: [],
        data
      });
    });
  }
}

export default new MovieDbApi(new MockHttpClient());

