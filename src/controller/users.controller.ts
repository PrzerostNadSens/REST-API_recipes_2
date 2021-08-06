import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { IUser, UserDocument } from '../model/user.model';
import usersService, { UsersService } from '../service/users.service';
import webhooksService, { WebhookEvent, WebhooksService } from '../service/webhooks.service';
import { StatusCodes } from 'http-status-codes';

const internalServerError = { message: 'Internal Server Error' };
const notUniqueLogin = { message: 'User with the given login already exists.' };

class UsersController {
  constructor(private readonly usersService: UsersService, private readonly webhooksService: WebhooksService) {}
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IUser>matchedData(req);

      const userId = await usersService.create(data);
      webhooksService.sendEvent('Admin', WebhookEvent.CreateUser, userId);

      return res.status(StatusCodes.CREATED).send({ id: userId });
    } catch (e) {
      if (e.code == 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json(notUniqueLogin);
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError);
    }
  }

  async generateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = <UserDocument>req.user;

    usersService
      .generateToken(user)
      .then(jwtToken => {
        res.json(jwtToken);
      })
      .catch(next);
  }
}

export default new UsersController(usersService, webhooksService);
