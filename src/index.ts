import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import morgan from 'morgan';
import { cloneDeep, clone } from 'lodash';

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

console.log('subSubFieldB ', myObjectA.someFieldE.someFieldB);

const myObjectB = myObjectA;

console.log('\nB ', myObjectB);

myObjectB.someFieldA = 'some value 2';

console.log('\nB ', myObjectB);

console.log('testA', myObjectA);

// let objects = { a: 1, b: { c: 2 } };
// console.log('objects: ');
// console.log(objects);
// let deep = clone(objects);
// let x = deep;
// console.log('deep: ');
// console.log(deep);

// console.log('x: ');
// console.log(x);
// console.log('deep[0]: ');
// console.log(deep[0]);
// console.log('objects[0]: ');
// console.log(objects[0]);
// console.log('x');
// console.log(x[0]);
// deep.a = 5;
// console.log('deep[0]: ');
// console.log(deep[0]);
// console.log('objects[0]: ');
// console.log(objects[0]);
// console.log('x');
// console.log(x[0]);

// console.log('objects: ');
// console.log(objects);

// console.log('deep: ');
// console.log(deep);

// console.log('x: ');
// console.log(x);
// objects.b.c = 100;
// console.log('objects: ');
// console.log(objects);

// console.log('deep: ');
// console.log(deep);

// console.log('x: ');
// console.log(x);
// //const deep = _.cloneDeep(objects);
// //console.log(deep[0] === objects[0]);

function test() {
  'use strict';

  let obj1 = { a: 0, b: { c: 0 } }; // a: wartość, b: referencja, c: wartość
  let obj2 = Object.assign(obj1);
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  console.log(' ');
  obj1.a = 1; // zmiana wartości, dotyczy tylko obj1
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}
  console.log(' ');
  obj2.a = null; // zmiana wartości, dotyczy tylko obj2
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}
  console.log(' ');
  obj2.b.c = null; // zmiana wartości w obiekcie o współdzielonej referencji
  console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}} //
  console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}} // i tu też b.c == 3, bo obj1.b === obj2.b
  console.log(' ');
  console.log(' ');
  console.log(' ');
  // Klonowanie głębokie
  // obj1 = { a: 0, b: { c: 0 } };
  // let obj3 = cloneDeep(obj1);
  // obj1.a = null;
  // obj1.b.c = null;
  // console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 4}} // obj1.b !== obj2.b

  // // Klonowanie głębokie
  // obj1 = { a: 0, b: { c: 0 } };
  // let obj3 = clone(obj1);
  // obj1.a = null;
  // obj1.b.c = null;
  // console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 4}} // obj1.b !== obj2.b

  const date1 = new Date('1995-12-17T03:24:00');
  console.log(' ');
  console.log('cloneDeep');
  let date2 = cloneDeep(date1);
  console.log(' ');
  console.log(date1);
  console.log(' ');
  console.log(date2);

  console.log(' ');
  const date11 = new Date('1995-12-17T03:24:00');
  console.log('clone');
  let date22 = clone(date11);
  console.log(' ');
  console.log(date11);
  console.log(' ');
  console.log(date22);

  console.log(' ');
  const date111 = new Date('1995-12-17T03:24:00');
  console.log('assign');
  let date222 = Object.assign(date111);
  console.log(' ');
  console.log(date111);
  console.log(' ');
  console.log(date222);

  console.log(' ');
  const date1111 = new Date('1995-12-17T03:24:00');
  console.log('JSON.parse');
  let date2222 = JSON.parse(JSON.stringify(date1111));
  console.log(' ');
  console.log(date1111);
  console.log(' ');
  console.log(date2222);
}

test();

export default app;
