import mongoose from 'mongoose';

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connectionString = `${process.env.DATABASE_PROTOCOL}${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?${process.env.DATABASE_CONNECTION_OPTIONS}`;

export function init(): void {
  mongoose.connect('mongodb://localhost:27017/api-db', connectionOptions);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () =>
    console.log('mongoose connected!', mongoose.connection.db.databaseName, '\n'),
  );
  mongoose.connection.on('error', error => console.log('mongoose error!', error));
}
