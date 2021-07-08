import config from "../../config.json";
import mongoose from "mongoose";
import { Recipe } from "../model/recipeModel"; //ta zmiana mogła wywołać błedy w recipeController
import { User } from "../model/userModel";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(
  process.env.MONGODB_URI || config.connectionString,
  connectionOptions
);
mongoose.Promise = global.Promise;

export default {
  User: User,
  Recipe: Recipe,
};

export function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
