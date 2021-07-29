import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import morgan from 'morgan';

import { lodash } from 'lodash';

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

const myObjectA = {
  someFieldA: 'some value',
  someFieldB: 1234,
  someFieldC: {
    subFieldA: 'some value',
    subFieldB: 1234,
  },
  someFieldD: ['some value', 'some value 2'],
  someFieldE: {
    subFieldA: {
      subSubFieldA: 'some value',
      subSubFieldB: 1234,
    },
    someFieldB: ['some value', 'some value 2'],
  },
};
console.log('\nA ', myObjectA);

// console.log('\ntesta', myObjectA.someFieldA);
// console.log('\ntestb', myObjectA.someFieldB);

// console.log('\ntestc', myObjectA.someFieldC);
// console.log('\ntestd', myObjectA.someFieldD);

// console.log('\nteste', myObjectA.someFieldE);

const myObjectB = myObjectA;

console.log('\nB ', myObjectB);

myObjectB.someFieldA = 'some value 2';

console.log('\nB ', myObjectB);

console.log('test', myObjectA);

const objects = [{ a: 1 }, { b: 2 }];

const deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);

export default app;
