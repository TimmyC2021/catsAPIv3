import express from 'express';
import cors from 'cors';
import cats from './cats';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/cats', (reqCats, resCats) => {
  resCats.send('resCats')
});

app.get('/cats/:catID', (reqGetCat, resGetCat) => {
  resGetCat.send('resGetCat')
});

app.post('/cats/:catID', (reqPostCat, resPostCat) => {
  resPostCat.send('resPostCat')
});

app.delete('/cats/:catID', (reqDeleteCat, resdeleteCat) => {
  resdeleteCat.send('resdeleteCat')
});

app.listen(8080);