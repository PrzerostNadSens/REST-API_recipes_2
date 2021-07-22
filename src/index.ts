import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipeRoutes from "./routes/recipe.routes.config";
import userRoutes from "./routes/users.routes.config";
import errorMiddleware from "./middleware/error.middleware";
import * as db from "./mongodb/db";
import morgan from "morgan";
import { swaggerSpec } from "./swagger/swagger";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use("/recipe", recipeRoutes);
app.use("/user", userRoutes);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) =>
  res.send("Obsługa przepisów kuchennych Rafał Chmielewski")
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("*", (req: Request, res: Response) => {
  return res.status(404).json({
    message: `Make sure url is correct!`,
  });
});
db.init();

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("Running REST_RECIPES on port " + port);
});
