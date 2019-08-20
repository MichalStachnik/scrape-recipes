import express from 'express';
import { fetchLaurainthekitchen, fetchMaangi, fetchEatTheLove, fetchNyt } from './controllers';

const app: express.Application = express();

app.get('/recipe/:url', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const url: string = req.params.url;
  switch (url) {
    case 'laurainthekitchen':
      console.log('fetching');
      return fetchLaurainthekitchen(req, res, next);
    case 'maangi':
      return fetchMaangi(req, res, next);
    case 'eatthelove':
      return fetchEatTheLove(req, res, next);
    case 'nytimes':
      return fetchNyt(req, res, next);
    default:
      console.warn('Invalid url');
      res.send({error: 'Invalid url'});
      break;
  }
});

const port: number = 3000;
app.listen(port, () => console.log(`server listening on ${port}`));

export default app;