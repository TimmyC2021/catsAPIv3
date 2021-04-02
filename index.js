import express from 'express';
import cors from 'cors';
import cats from './cats.js';


const app = express();

app.use(cors());

app.use(express.json());


app.get('/cats', (reqCats, resCats) => {
  resCats.send(cats);
  // resCats.send('The End')
});

app.get('/cats/:catID', (reqGetCat, resGetCat) => {
  const catID = reqGetCat.params.catID;
  const result = cats.filter( cat => {
    if (cat.id == catID) {
      return cat
    }
  })
  if (result.length > 0) {
    resGetCat.send(result)
  } else {
  resGetCat.send(`No such cat`)
}});

app.post('/cats/', (reqPostCat, resPostCat) => {
  const toLog = reqPostCat.body[0].id;
  console.log(toLog);
  

  resPostCat.send('resPostCat')
});

app.delete('/cats/:catID', (reqDeleteCat, resDeleteCat) => {
  resDeleteCat.send('resDeleteCat')
});

app.listen(8080);