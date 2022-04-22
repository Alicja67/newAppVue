const express = require("express");
const datasRoutes = require("./routes/datas.routes");
const linksRoutes = require("./routes/links.routes");
const contactRoutes = require("./routes/contacts.routes");
const titlesRoutes = require("./routes/titles.routes");
const titleRoutes = require("./routes/title.routes");
// const path = require("path");
const cors = require("cors");
const morgan = require('morgan');
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
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '/app/dist')));

//import ROUTES
app.get("/", (req, res) => {
  res.send(`This is Alisha's REST API aplication`);
})
app.use("/datas", datasRoutes);
app.use("/links", linksRoutes);
app.use("/contacts", contactRoutes);
app.use("/titles", titlesRoutes);
app.use("/title", titleRoutes);
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
    }
  })
});

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
