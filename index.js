require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


app.get('/', (req, res) => res.send('Obsługa przepisów kuchennych Rafał Chmielewski'));

// Setup server port
var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Running REST_RECIPES on port " + port);
});