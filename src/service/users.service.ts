import UsersDao from "../daos/users.dao";
import { IUser, UserDocument } from "../model/userModel";
import bcrypt from "bcryptjs";
class UsersService {
  async create(resource: IUser): Promise<string> {
    const newUser: IUser = resource;
    const newPassword = await bcrypt.hash(resource.password!, 10);
    newUser.password = newPassword;

    const { id } = await UsersDao.createUser(newUser);
    return id;
  }

  async generateToken(user: UserDocument): Promise<string> {
    return UsersDao.generateToken(user);
  }
}

export default new UsersService();
