import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import morgan from 'morgan';

dotenv.config();

import * as db from './mongodb/db';
import { routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  }),
);

app.use(routes);

app.use(errorMiddleware);

db.init();

app.listen(port, function () {
  console.log('Running REST_RECIPES on port ' + port);
});

export default app;
