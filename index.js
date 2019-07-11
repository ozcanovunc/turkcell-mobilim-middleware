const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pickEndpoints = require("./lib/pickEndpoints");
const endpoints = require("./endpoints");
const { PORT, GENERIC_SUCCESS_CODE } = require("./lib/constants");

app.use(bodyParser.json());

app.get('/', function(req, res) {
   res
      .status(GENERIC_SUCCESS_CODE)
      .send('<title>Turkcell</title>' +
         '<center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAxCVXwC-y6LSdUTcxZZkL1Mvxo_cDpDMv_U_fMbiDdce9D2A" ></img> ' +
         '<h1 style="font-family:sans-serif;">Mobilim Middleware is up and running...</h1></center>').end();
});

app.listen(PORT, () => console.log(`Mobilim Middleware listening on port ${PORT}!`));

pickEndpoints(app, endpoints);
