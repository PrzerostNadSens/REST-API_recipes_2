import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
const router = require("express").Router();
import Joi from "@hapi/joi";
import UsersService from "../service/users.service";

class UsersController {
  async createUser(req: Request, res: Response): Promise<Response> {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const userId = await UsersService.create(req.body);
    return res.status(201).send({ id: userId });
  }

  async authenticateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    });
    validateRequest(req, res, next, schema);
  }

  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { login, password } = req.body;
    UsersService.authenticate(login, password)
      .then((...user) => {
        res.json(user);
      })
      .catch(next);
  }
}

async function validateRequest(
  req: Request,
  res: Response,
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
    return res.status(401).json({
      message: `Validation error: ${error.details
        .map((x: any) => x.message)
        .join(", ")}`,
    });
  } else {
    req.body = value;
    next();
  }
}

export default new UsersController();
