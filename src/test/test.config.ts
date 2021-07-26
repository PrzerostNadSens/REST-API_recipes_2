import dotenv from "dotenv";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import faker from "faker";
chai.use(chaiHttp);

dotenv.config();
// const DATABASE_NAME = "recipe-test-db";
// const connectionString = `${process.env.DATABASE_PROTOCOL}${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${DATABASE_NAME}?${process.env.DATABASE_CONNECTION_OPTIONS}`;

process.env.DATABASE_NAME = "recipe-test-db";
import app from "../index";

export { chai, expect, faker, app };
