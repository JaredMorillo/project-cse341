const express = require("express");
const app = express();
const routes = require("./routes");
const db = require("./database/db");
const BodyParser = require("body-parser")
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// Permitir todas las solicitudes de cualquier origen
app.use(cors());

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.use("/", routes);

db.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database and App listening on port ${port}`);
    });
  }
});