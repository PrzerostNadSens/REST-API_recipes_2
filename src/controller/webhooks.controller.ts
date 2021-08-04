import { IWebhook } from '../model/webhook.model';
import { Request, Response } from 'express';
import { returnId, returnRole, AuthorizedRequest } from '../mongodb/authorize';
import WebhooksService from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const internalServerError = { message: 'Internal Server Error' };
class WebhooksController {
  async createWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IWebhook>matchedData(req);
      data.addedBy = returnId(req);
      const webhookId = await WebhooksService.create(data);

      return res.status(StatusCodes.CREATED).send({ id: webhookId });
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }

  async getUserWebhooks(req: AuthorizedRequest, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const webhook = await WebhooksService.get(userId);

      return res.status(StatusCodes.OK).send(webhook);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(internalServerError);
    }
  }
}
export default new WebhooksController();
