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
  const newCat = reqPostCat.body;
  const catID = newCat.id;
    //Check if id already exists
  const result = cats.filter( cat => {
    if (cat.id == catID) {
      return cat
    }
  })
  if (result.length > 0) {
    //id already in use
    resPostCat.send('id already exists')
  } else {
    // new id so add the new cat
    cats.push(newCat)
    resPostCat.send(cats)
  }
});

app.delete('/cats/:catID', (reqDeleteCat, resDeleteCat) => {
  
  const catID = reqDeleteCat.params.catID;
  const index = cats.findIndex(cat => {
    if (cat.id == catID) {
      return cat
    }
  })
  
  if (index > -1) {
    cats.splice(index,1)
    resDeleteCat.send('Cat removed')
  } else {
    resDeleteCat.send(`No such cat to delete`)
  }
console.log(`cats after`);
console.log(cats);
});

app.patch('/cats/:catID', (reqPatchCat, resPatchCat) => {
  console.log(`cats before`);
  console.log(cats);
  
  const catID = reqPatchCat.params.catID;
  console.log(reqPatchCat.body);
  
  const keys = Object.keys(reqPatchCat.body);
  const values = Object.values(reqPatchCat.body);
  console.log(keys);
  console.log(values);
  
  
  const index = cats.findIndex(cat => {
    if (cat.id == catID) {
      return cat
    }
  })

  if (index  > -1) {

    for (let loopCount=0; loopCount < keys.length; loopCount++) {
    cats[index][keys[loopCount]]=values[loopCount];
    }
    resPatchCat.send(cats);
  } else {
    resPatchCat.send('Cat not found')
  }
  console.log(`cats after`);
  console.log(cats);
})

app.put('/cats/:catID', (reqPutCat, resPutCat) => {
  const catID = reqPutCat.params.catID;
  const updateCat = reqPutCat.body;
  console.log(catID);
  
  const index = cats.findIndex( cat => {
    if (cat.id == catID) {
      return cat
    }
  })

  if (index > -1) {
    cats.splice(index,1);
    cats.push(updateCat);
    console.log(cats);
    resPutCat.send('Cat exists')
  } else {
    cats.push(updateCat);
    console.log(cats);
    
    resPutCat.send('No cat found')
  }
  // resPutCat.send('Hello')
})

app.listen(8080);