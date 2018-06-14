import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; dotenv.config();
import helmet from 'helmet';
import movieDbApi from './external/movieDbApi';
import viaplayApi from './external/viaplayApi';

// Test
// Readme

const app: Application = express();
const port: number = parseInt(process.env.PORT) || 8080;
app.use(helmet());

app.get('/api/trailer', (req: Request, res: Response, next: NextFunction) => {
  viaplayApi.getImdbIdFromUrl(req.query.url)
    .then((id: string) => movieDbApi.findMovieId(id))
    .then((id: number) => movieDbApi.getMovieTrailer(id))
    .then((trailerUrl: string) => res.json({ trailerUrl }))
    .catch(next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}/`));