import dotenv from "dotenv";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
chai.use(chaiHttp);

dotenv.config();

process.env.DATABASE_NAME = "recipe-test-db";
import app from "../index";

export { chai, expect, faker, app };
