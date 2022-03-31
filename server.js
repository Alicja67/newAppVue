const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = '8000';

app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send(db);
});

app.get('/data', (req, res) => {
  console.log(db[0].data[0].title)
  return res.send(db);
});


// app.get('/title', (req, res) => {
//   return res.json(db[0].data[0].title);
// });


// app.get('/data', (req, res) => {
//   return res.json(db[0].data[0].title)
//     // db.map(data => {
//     //   `${data.href}`;
//     // })
//   // );
// });


app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));