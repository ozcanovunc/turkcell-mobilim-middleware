const PORT = 80;
const app = require("express")();
const pickEndpoints = require("./lib/pickEndpoints");
const endpoints = require("./endpoints");

app.get('/', function(req, res) {
   res
      .status(200)
      .send('<title>Turkcell</title>' +
         '<center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAxCVXwC-y6LSdUTcxZZkL1Mvxo_cDpDMv_U_fMbiDdce9D2A" ></img> ' +
         '<h1>Turkcell Poc Middleware is up and running...</h1> <p>' + req.headers.cookie + '</p></center>').end();
});

app.listen(PORT, () => console.log(`Turkcell Poc Middleware listening on port ${PORT}!`));

pickEndpoints(app, endpoints);
