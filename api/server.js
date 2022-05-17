const express = require('express');
const datasRoutes = require('./routes/datas.routes');
const dataRoutes = require('./routes/data.routes');
const linksRoutes = require('./routes/links.routes');
const linkRoutes = require('./routes/link.routes');
const contactsRoutes = require('./routes/contacts.routes');
const contactRoutes = require('./routes/contact.routes');
const titlesRoutes = require('./routes/titles.routes');
const titleRoutes = require('./routes/title.routes');
const usersRoutes = require('./routes/users.routes');
const userRoutes = require('./routes/user.routes');

// const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const https = require('https');
const fs = require('fs');

// const bodyParser = require('body-parser');
// const db = require('./db');

const app = express();
const PORT = '3000';
app.use(
  cors({
    origin: 'https://spacer-magic.mac.pl:8081', //origin sets domains that we approve
    methods: 'GET,POST,DELETE,PUT', //we allow only GET and POST methods
  })
);
const corsOptions = {
  origin: [
    'http://localhost',
    'http://localhost:8080',
    'https://spacer-magic.mac.pl:8081',
    'https://spacer-magic.mac.pl',
  ],
};

// const options = {
//   key: fs.readFileSync(__dirname + '/tls.key', 'utf8'),
//   cert: fs.readFileSync(__dirname + '/tls.crt', 'utf8'),
// };

// https
//   .createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end('Server is running');
//   })
//   .listen(PORT);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '/app/dist')));

//import ROUTES
app.get('/', (req, res) => {
  res.send(`This is Alisha's REST API aplication`);
});
app.use('/datas', datasRoutes);
app.use('/data', dataRoutes);
app.use('/links', linksRoutes);
app.use('/link', linkRoutes);
app.use('/contacts', contactsRoutes);
app.use('/contact', contactRoutes);
app.use('/titles', titlesRoutes);
app.use('/title', titleRoutes);
app.use('/users', usersRoutes);
app.use('/user', userRoutes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/app/dist/index.html'));
// });

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Connect to DB
mongoose.connect('mongodb://mongo:27017/SpacerVue', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));
// mongoose.connect(process.env.DB_CONNECTION, () => {
//   console.log('Connected to DB');
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
//   const server = https.createServer(this);
//   return server.listen.apply(server, arguments);
// });
