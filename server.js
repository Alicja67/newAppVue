const express = require('express');
const datasRoutes = require('./routes/datas.routes');
const linksRoutes = require('./routes/links.routes');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv/config');

// const bodyParser = require('body-parser');
// const db = require('./db');

const app = express();
const PORT = '8000';

app.use(express.json());
app.use(express.static(path.join(__dirname, '/dist')));

//import ROUTES
app.use('/datas', datasRoutes);
app.use('/links', linksRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use((req, res) => {
  res.status(404).send({
    message: 'Not found...',
    status: 404,
  });
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connected to DB');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
