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

app.use("/recipe", recipeRoutes);
app.use("/users", userRoutes);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) =>
  res.send("Obsługa przepisów kuchennych Rafał Chmielewski")
);

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: "REST-API_RECIPES",
    description:
      "Handling of cooking recipes Rafał Chmielewski.\n\nUsers who are not logged in can create an account themselves assigning themselves roles.\nThere are two types of users 'User' and 'Admin' in the application.\n'User' can only view, edit and delete his own recipes and create a new recipe.\n'Admin' can additionally display all recipes.\n\nJSON Web Token is used for authentication in the application.",
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
