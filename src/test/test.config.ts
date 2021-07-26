import dotenv from "dotenv";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
chai.use(chaiHttp);

dotenv.config();

process.env.DATABASE_CONNECTION_STRING =
  "mongodb+srv://Admin:trudne_haslo.123@cluster0.edli7.mongodb.net/recipe-test-db?retryWrites=true&w=majority";

import app from "../index";

export { chai, expect, faker, app };
