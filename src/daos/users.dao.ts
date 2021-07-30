import jwt from 'jsonwebtoken';
import { IUser, User, UserDocument } from '../model/user.model';

class UsersDao {
  public createUser(createUserBody: IUser): Promise<UserDocument> {
    return new User(createUserBody).save();
  }

  async generateToken(user: UserDocument): Promise<object> {
    const tokenActivityTime = '2h';
    const token = jwt.sign({ sub: user.id, id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: tokenActivityTime,
    });
    return {
      token,
    };
  }
}

export default new UsersDao();
