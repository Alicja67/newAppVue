const express = require('express');

const app = express();
const path = require('path');
// app.use(cors());
// app.use(express.json());
// const router = express.Router();
// app.use(express.static('public'));

// app.use(express.static(path.join(__dirname, '/src')));

//Geting all
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Geting one
// app.get('/images', (req, res) => {

// });




app.listen(8000, () => console.log('Server started on port 8000'));