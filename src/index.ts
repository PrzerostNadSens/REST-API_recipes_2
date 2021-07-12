import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import User from "../src/controller/userController";
import apiRoutes from "../src/routes/api-routes";
//const error = require("/errors/error");
//import { error } from "../src/errors/error";

import * as db from "./mongodb/db";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// api routes
app.use("/User", User);

app.use("/Recipe", apiRoutes);
//app.use(error);

app.get("/", (req, res) =>
  res.send("Obsługa przepisów kuchennych Rafał Chmielewski")
);

db.init();

// Setup server port
const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("Running REST_RECIPES on port " + port);
});
