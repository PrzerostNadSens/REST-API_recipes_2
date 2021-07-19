import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipeRoutes from "./routes/recipe.routes.config";
import userRoutes from "../src/routes/users.routes.config";
import errorMiddleware from "./middleware/error.middleware";
import * as db from "./mongodb/db";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import morgan from "morgan";
import { SwaggerDefinition } from "swagger-jsdoc";
import swaggerJSDoc from "swagger-jsdoc";

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

app.use("/Recipe", recipeRoutes);
app.use("/Users", userRoutes);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) =>
  res.send("Obsługa przepisów kuchennych Rafał Chmielewski")
);

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: "aasd",
    description: "asd",
    version: "1.0.0",
  },
  host: "localhost:8080",
  basePath: "/",
};

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ["./**/*routes.config.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//app.get("/docs", (req, res) => res.sendStatus(200));

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
