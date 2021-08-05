import { IWebhook } from '../model/webhook.model';
import { Request, Response } from 'express';
import { returnId } from '../mongodb/authorize';
import WebhooksService from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import responses from '../exceptions/exceptions';

class WebhooksController {
  async createWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IWebhook>matchedData(req);
      const userId = returnId(req);
      const webhookId = await WebhooksService.create(userId, data);

      return responses.sendCreatedWithId(res, webhookId);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getUserWebhooks(req: Request, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const webhook = await WebhooksService.get(userId);

      return responses.sendOkWithWebhook(res, webhook);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }
}
export default new WebhooksController();
