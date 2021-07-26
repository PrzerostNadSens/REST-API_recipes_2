import mongoose from "mongoose";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

export function init(): void {
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING!, connectionOptions);
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () =>
    console.log(
      "mongoose connected!",
      mongoose.connection.db.databaseName,
      "\n"
    )
  );
  mongoose.connection.on("error", (error) =>
    console.log("mongoose error!", error)
  );
}

export function isValidId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}
