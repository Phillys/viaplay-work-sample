import { ViaplayApi } from '../../src/external/viaplayApi';
import { IHttpClient, IHttpClientPromise, IHttpRequestConfig } from '../../src/services/httpClient';

class MockHttpClient implements IHttpClient {
  get(url, config?: IHttpRequestConfig): IHttpClientPromise<any> {
    return new Promise((resolve, reject) => {
      if (url !== 'https://content.viaplay.se/pc-se/film/arrival-2016') {
        reject();
      }

      return resolve({
        config: {},
        status: 200,
        statusText: 'OK',
        headers: [],
        data: {
          _embedded: {
            'viaplay:blocks': [
              {
                _embedded: {
                  'viaplay:product': {
                    content: {
                      imdb: {
                        id: 'tt2543164'
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      });
    });
  }
}

export default new ViaplayApi(new MockHttpClient());
