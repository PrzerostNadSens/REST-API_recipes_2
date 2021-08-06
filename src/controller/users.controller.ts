import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { IUser, UserDocument } from '../model/user.model';
import usersService, { UsersService } from '../service/users.service';
import webhooksService, { WebhookEvent, WebhooksService } from '../service/webhooks.service';
import responses from '../exceptions/exceptions';

class UsersController {
  constructor(private readonly usersService: UsersService, private readonly webhooksService: WebhooksService) {}
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IUser>matchedData(req);

      const userId = await usersService.create(data);
      webhooksService.sendEvent('Admin', WebhookEvent.CreateUser, userId);

      return responses.sendCreatedWithId(res, userId);
    } catch (e) {
      if (e.code == 11000) {
        return responses.notUnique(res, 'User');
      }
      return responses.sendInternalServerErrorResponse(res);
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
