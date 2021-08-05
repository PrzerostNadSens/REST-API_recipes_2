import { IWebhook, Webhook } from '../model/webhook.model';
import { Request, Response } from 'express';
import { returnId, returnRole } from '../mongodb/authorize';
import WebhooksService from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import responses from '../exceptions/exceptions';

class WebhooksController {
  async createWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IWebhook>matchedData(req);
      const userId = returnId(req);
      const userRole = returnRole(req);

      const webhookId = await WebhooksService.createWebhook(userId, userRole, data);
      if (webhookId === '') {
        return responses.notUnique(res, 'Webhook');
      }
      return responses.sendCreatedWithId(res, webhookId);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getUserWebhooks(req: Request, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const webhook = await WebhooksService.getWebhook(userId);

      return responses.sendOkWithWebhooks(res, webhook);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async updateWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.webhookId;
      const userId = returnId(req);
      const webhook = await Webhook.findById(id);

      if (!webhook) {
        return responses.notFound(res);
      }
      if (webhook.addedBy !== userId) {
        return responses.forbidden(res);
      }
      const newWebhook = await WebhooksService.update(id, req.body);

      return responses.sendOkWithWebhook(res, newWebhook);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async removeByIdWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.webhookId;
      const userId = returnId(req);
      const webhook = await Webhook.findById(id);

      if (!webhook) {
        return responses.notFound(res);
      }
      if (webhook.addedBy !== userId) {
        return responses.forbidden(res);
      }

      const message = await WebhooksService.remove(id);

      return responses.sendNoContent(res);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }
}
export default new WebhooksController();
