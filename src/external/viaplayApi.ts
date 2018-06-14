import get from 'lodash/get';
import URL, { UrlWithStringQuery } from 'url';
import { IHttpClient, httpClientFactory } from '../services/httpClient';

class ViaplayApi {

  private http: IHttpClient;

  constructor(http?: IHttpClient) {
    this.http = http || httpClientFactory();
  }

  isValidUrl(url: string) {
    const { protocol, host, pathname }: UrlWithStringQuery = URL.parse(url);
  
    return (
      protocol === 'https:' &&
      host === 'content.viaplay.se' &&
      pathname.startsWith('/pc-se/film/') &&
      pathname.length > '/pc-se/film/'.length
    );
  }

  getFromUrl(url: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isValidUrl(url)) {
        return this.http
          .get(url)
          .then(({ data }) => resolve(data))
          .catch(() => reject(Error('Error, could not retrive the movie from Viaplay')));
      }

      return reject(new Error('Invalid Viaplay URL'));
    });
  }

  getImdbIdFromUrl(url: string) : Promise<string> {
    return this.getFromUrl(url)
      .then(movie => {
        const imdbId: string|null = get(movie, '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id', null);

        if (imdbId === null) {
          throw new Error('Movie is missing IMDB ID');
        }
        
        return imdbId;
      })
  }

}

export default new ViaplayApi();