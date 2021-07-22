import UsersDao from "../daos/users.dao";
import { IUser } from "../model/userModel";
import bcrypt from "bcryptjs";

class UsersService {
  async create(resource: IUser) {
    const newUser: IUser = resource;
    const newPassword = await bcrypt.hash(resource.password!, 10);
    newUser.password = newPassword;

    return UsersDao.createUser(newUser);
  }

  async authenticate(login: string, password: string) {
    return UsersDao.authenticate_function(login, password);
  }
}

export default new UsersService();
