import UsersDao from "../daos/users.dao";
import { CRUD } from "../interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";

class UsersService implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async deleteById(id: string) {
    return UsersDao.removeUserById(id);
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers();
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async putById(id: string, resource: PutUserDto) {
    return UsersDao.putUserById(id, resource);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async authenticate_function(
    login: string,
    password: string,
    ipAddress: string
  ) {
    const user = await User.findOne({ login });

    if (!user) {
      return "Nieprawidłowy login";
    }
    if (!bcrypt.compare(password, user.password as any)) {
      return "Nieprawidłowe hasło";
    }

    return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
      expiresIn: "15m",
    });
  }
}

export default new UsersService();
