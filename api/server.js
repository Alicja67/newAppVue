const express = require("express");
const datasRoutes = require("./routes/datas.routes");
const linksRoutes = require("./routes/links.routes");
const contactRoutes = require("./routes/contacts.routes");
const titlesRoutes = require("./routes/titles.routes");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

// const bodyParser = require('body-parser');
// const db = require('./db');

const app = express();
const PORT = "3000";
const corsOptions = {
  // origin: ["http://localhost", "http://localhost:8080"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '/app/dist')));

//import ROUTES
app.get("/", (req, res) => {
  res.send(`This is Alisha's REST API aplication`);
})
app.use("/datas", datasRoutes);
app.use("/links", linksRoutes);
app.use("/contacts", contactRoutes);
app.use("/titles", titlesRoutes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/app/dist/index.html'));
// });

app.use((req, res) => {
  res.status(404).send({
    message: "Not found...",
    status: 404,
  });
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});
// mongoose.connect(
//   'mongodb://mongo:27017/docker-node-mongo',
//   { useNewUrlParser: true }
// )
// .then(()=> console.log('MongoDB connecion'))
// .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
