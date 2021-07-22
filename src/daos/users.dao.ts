import config from "../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser, User } from "../model/userModel";

class UsersDao {
  async createUser(createUserBody: IUser) {
    const userToSave = new User(createUserBody);
    await userToSave.save();
    return userToSave.id;
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

function Token(user: any) {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}

export default new UsersDao();
