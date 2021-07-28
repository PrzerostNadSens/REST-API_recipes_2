import jwt from 'jsonwebtoken';
import { IUser, User, UserDocument } from '../model/userModel';

class UsersDao {
  public createUser(createUserBody: IUser): Promise<UserDocument> {
    return new User(createUserBody).save();
  }

  async generateToken(user: UserDocument): Promise<string> {
    return jwt.sign({ sub: user.id, id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '2h',
    });
  }
}

export default new UsersDao();
