//const router = express.Router();
const router = require("express").Router();
import Joi from "@hapi/joi";
import express, { NextFunction, Request, Response } from "express";

import UsersService from "../service/users.service";
router.route("/Login").post(authenticateSchema, authenticate);
export default router;

export function validateRequest(req: Request, next: NextFunction, schema: any) {
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

export function authenticateSchema(
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

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { login, password } = req.body;
  const ipAddress = req.ip;
  UsersService.authenticate_function(login, password, ipAddress)
    .then((...user) => {
      res.json(user);
    })
    .catch(next);
}
