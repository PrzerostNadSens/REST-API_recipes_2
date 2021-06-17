require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const error = require('errors/error');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/User', require('controller/userController'));


let apiRoutes = require("./api-routes");
app.use('/Recipe', apiRoutes);
app.use(error);

app.get('/', (req, res) => res.send('Obsługa przepisów kuchennych Rafał Chmielewski'));

// Setup server port
var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log("Running REST_RECIPES on port " + port);
});