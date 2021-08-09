import { IWebhook, Webhook } from '../model/webhook.model';
import { Request, Response } from 'express';
import { returnId, returnRole } from '../mongodb/authorize';
import webhooksService, { WebhooksService } from '../service/webhooks.service';
import { matchedData } from 'express-validator';
import responses from '../exceptions/exceptions';

class WebhooksController {
  constructor(private webhooksService: WebhooksService) {}

  async createWebhook(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IWebhook>matchedData(req);
      const userId = returnId(req);
      const userRole = returnRole(req);

      const webhook = await this.webhooksService.createWebhook(userId, userRole, data);
      if (webhook === null) {
        return responses.notUnique(res, 'Webhook');
      }

      return responses.sendCreateWithWebhook(res, webhook);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }

  async getUserWebhooks(req: Request, res: Response): Promise<Response> {
    try {
      const userId = returnId(req);
      const webhook = await this.webhooksService.getWebhook(userId);

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
        return responses.notFound(res, 'webhook');
      }
      if (webhook.addedBy !== userId) {
        return responses.forbidden(res);
      }
      const newWebhook = await this.webhooksService.update(id, req.body);
      if (newWebhook === null) {
        return responses.notUnique(res, 'Webhook');
      }

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
        return responses.notFound(res, 'webhook');
      }
      if (webhook.addedBy !== userId) {
        return responses.forbidden(res);
      }

      const message = await this.webhooksService.remove(id);

      return responses.sendNoContent(res);
    } catch (e) {
      return responses.sendInternalServerErrorResponse(res);
    }
  }
}
export default new WebhooksController(webhooksService);
