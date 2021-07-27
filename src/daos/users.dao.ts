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
      return null;
    }

    const password1 = password;
    const loginPassword = user.password;
    if (!(await bcrypt.compare(password, loginPassword!))) {
      return null;
    }

    const jwtToken = Token(user);
    return {
      jwtToken,
    };
  }
}

function Token(user: any) {
  return jwt.sign({ sub: user.id, id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

export default new UsersDao();
