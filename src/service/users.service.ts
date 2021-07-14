import UsersDao from "../daos/users.dao";
import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, User } from "../model/userModel";

class UsersService {
  async create(resource: IUser) {
    return UsersDao.createUser(resource);
  }

  async authenticate_function(login: string, password: string) {
    const user = await User.findOne({ login });

    if (!user) {
      return { message: "Unauthorized" };
    }
    if (!bcrypt.compare(password, user.password as any)) {
      return { message: "Unauthorized" };
    }

    const jwtToken = Token(user);
    return {
      jwtToken,
    };
  }
}
export function Token(user: any) {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}

export default new UsersService();
