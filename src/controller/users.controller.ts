import express, { NextFunction, Request, Response } from "express";
import usersService from "../service/users.service";
import bcrypt from "bcryptjs";
import debug from "debug";
const router = require("express").Router();
import Joi from "@hapi/joi";
import UsersService from "../service/users.service";

const log: debug.IDebugger = debug("app:users-controller");
class UsersController {
  async createUser(req: Request, res: Response): Promise<express.Response> {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const userId = await usersService.create(req.body);
    return res.status(201).send({ id: userId });
  }
}

export default new UsersController();

export async function validateRequest(
  req: Request,
  next: NextFunction,
  schema: any
) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(
      `Validation error: ${error.details.map((x: any) => x.message).join(", ")}`
    );
  } else {
    req.body = value;
    next();
  }
}

export async function authenticateSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { login, password } = req.body;
  UsersService.authenticate_function(login, password)
    .then((...user) => {
      res.json(user);
    })
    .catch(next);
}
