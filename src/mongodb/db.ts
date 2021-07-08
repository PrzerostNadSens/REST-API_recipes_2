import config from "../../config.json";
import mongoose from "mongoose";

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
  User: require("../model/userModel"),
  Recipe: require("../model/recipeModel"),
  isValidId,
};

export function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
