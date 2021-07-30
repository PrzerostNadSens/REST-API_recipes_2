import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { IUser, UserDocument } from '../model/user.model';
import UsersService from '../service/users.service';
import { StatusCodes } from 'http-status-codes';

const internalServerError = { message: 'Internal Server Error' };

class UsersController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IUser>matchedData(req);

      const userId = await UsersService.create(data);

      return res.status(StatusCodes.CREATED).send({ id: userId });
    } catch (e) {
      if (e.code == 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `${e.message}`,
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async generateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = <UserDocument>req.user;

    UsersService.generateToken(user)
      .then(jwtToken => {
        res.json(jwtToken);
      })
      .catch(next);
  }
}

export default new UsersController();
