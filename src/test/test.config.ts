import dotenv from "dotenv";

dotenv.config();

process.env.DATABASE_CONNECTION_STRING =
  "mongodb+srv://Admin:trudne_haslo.123@cluster0.edli7.mongodb.net/recipe-test-db?retryWrites=true&w=majority";

console.log(
  "test",
  "process.env.DATABASE_CONNECTION_STRING",
  process.env.DATABASE_CONNECTION_STRING
);
