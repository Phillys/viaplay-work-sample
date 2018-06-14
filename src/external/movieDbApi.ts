import get from 'lodash/get';
import { IHttpClient, httpClientFactory } from '../services/httpClient';

export class MovieDbApi {

  private http: IHttpClient;
  private readonly movieDbApiKey: string = process.env.MOVIE_DB_API_KEY;

  constructor(http?: IHttpClient) {
    this.http = http || httpClientFactory({
      baseURL: 'https://api.themoviedb.org/3/',
      params: {
        api_key: this.movieDbApiKey
      }
    });
  }

  findMovieId(imdbId: string) : Promise<number> {
    return this.http
      .get(`/find/${imdbId}`, { params: { external_source: 'imdb_id' } })
      .then(({ data }) => {
        const id: number|null = get(data, 'movie_results[0].id', null);

        if (id === null) {
          throw new Error('Movie is missing ID');
        }
        
        return id;
      })
      .catch(() => {
        throw new Error('Error, could not find the movie');
      });
  }
    
  getMovieTrailer(id: number) : Promise<string> {
    return this.http
      .get(`/movie/${id}/videos`)
      .then(({ data }) => {
        const trailers: Array<any> = get(data, 'results', []);
        const ytTrailer = trailers.find((t: any) => t.type === 'Trailer' && t.site === 'YouTube');
        
        if (ytTrailer) {
          return `https://youtu.be/${ytTrailer.key}`;
        }

        const err = new Error('Movie trailer not found');
        err.status = 404;
        throw err;
      })
      .catch(() => { throw new Error('Error, could not retrive the movie trailer'); });
  }

}

export default new MovieDbApi();
