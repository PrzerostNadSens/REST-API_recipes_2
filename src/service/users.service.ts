import UsersDao from '../daos/users.dao';
import { IUser, UserDocument } from '../model/user.model';
import bcrypt from 'bcryptjs';

export class UsersService {
  async createUser(resource: IUser): Promise<string> {
    const newUser: IUser = resource;
    const newPassword = await bcrypt.hash(resource.password!, 10);
    newUser.password = newPassword;

    const { id } = await UsersDao.createUser(newUser);
    return id;
  }

  async getUser(userId: string): Promise<UserDocument> {
    return UsersDao.getUser(userId);
  }

  async generateToken(user: UserDocument): Promise<object> {
    return UsersDao.generateToken(user);
  }
}

export default new UsersService();
