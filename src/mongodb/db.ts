import config from "../../config.json";
import mongoose from "mongoose";
//import { Recipe } from "../model/recipeModel"; //ta zmiana mogła wywołać błedy w recipeController
//import { User } from "../model/userModel";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export function init(): void {
  mongoose.connect(
    process.env.MONGODB_URI || config.connectionString,
    connectionOptions
  );
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () =>
    console.log(
      "test",
      "mongoose connected!",
      mongoose.connection.db.databaseName
    )
  );
  mongoose.connection.on("error", (error) =>
    console.log("test", "mongoose error!", error)
  );
}

export function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
