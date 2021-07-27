import UsersDao from "../daos/users.dao";
import { IUser } from "../model/userModel";
import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import { NextFunction } from "express";

class UsersService {
  async create(resource: IUser) {
    const newUser: IUser = resource;
    const newPassword = await bcrypt.hash(resource.password!, 10);
    newUser.password = newPassword;

    return UsersDao.createUser(newUser);
  }

  async authenticate(login: string, password: string) {
    return UsersDao.authenticateUser(login, password);
  }

  async validateRequest(login: string, password: string, next: NextFunction) {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const schema = Joi.object({
      login: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate({ login, password }, options);

    if (error) {
      throw error;
    }
    next();
  }
}

export default new UsersService();
