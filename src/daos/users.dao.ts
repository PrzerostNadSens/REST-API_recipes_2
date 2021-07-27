import jwt from "jsonwebtoken";
import { IUser, User, UserDocument } from "../model/userModel";

class UsersDao {
  async createUser(createUserBody: IUser) {
    const userToSave = new User(createUserBody);
    await userToSave.save();
    return userToSave.id;
  }

  async authenticateUser(user: UserDocument) {
    const jwtToken = Token(user);
    return {
      jwtToken,
    };
  }
}

function Token(user: UserDocument) {
  return jwt.sign({ sub: user.id, id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
}

export default new UsersDao();
