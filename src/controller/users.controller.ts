import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import { IUser, UserDocument } from '../model/user.model';
import usersService, { UsersService } from '../service/users.service';
import webhooksService, { WebhookEvent, WebhooksService } from '../service/webhooks.service';
import responses from '../exceptions/exceptions';
import { returnId } from '../mongodb/authorize';

class UsersController {
  constructor(private readonly usersService: UsersService, private readonly webhooksService: WebhooksService) {}
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IUser>matchedData(req);

      const userId = await this.usersService.create(data);
      this.webhooksService.sendEvent('Admin', WebhookEvent.CreateUser, userId);

      return responses.sendCreatedWithId(res, userId);
    } catch (e) {
      if (e.code == 11000) {
        return responses.notUnique(res, 'User');
      }
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const user = await this.usersService.get(userId);

      return responses.sendOkWithUser(res, user);
    } catch (e) {
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
