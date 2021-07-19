import UsersDao from "../daos/users.dao";
import { IUser } from "../model/userModel";

class UsersService {
  async create(resource: IUser) {
    return UsersDao.createUser(resource);
  }

  async authenticate(login: string, password: string) {
    return UsersDao.authenticate_function(login, password);
  }
}

export default new UsersService();
