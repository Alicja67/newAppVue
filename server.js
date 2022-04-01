const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/data.routes');
const linksRoutes = require('./routes/links.routes');
// const db = require('./db');


const app = express();
const PORT = '8000';

app.use(express.json());
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from HomePage!');
});
app.use('/data', dataRoutes);
app.use('/links', linksRoutes);

app.post('/title', (req, res) => {
  // const { title } = req.body;
  // db.
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404,
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
