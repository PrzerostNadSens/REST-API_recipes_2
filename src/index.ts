import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipe_routes from "./routes/recipe.routes.config";
import user_routes from "../src/routes/users.routes.config";
import errorMiddleware from "./middleware/error.middleware";
import * as db from "./mongodb/db";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use("/Recipe", recipe_routes);
app.use("/Users", user_routes);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) =>
  res.send("Obsługa przepisów kuchennych Rafał Chmielewski")
);

db.init();

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("Running REST_RECIPES on port " + port);
});
