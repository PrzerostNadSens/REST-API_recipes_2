import WebhooksDao from '../daos/webhooks.dao';
import { IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';
import axios from 'axios';

export enum WebhookEvent {
  CreateRecipe = '`Created new recipe.',
  UpdateRecipe = 'Updated recipe.',
  RemoveRecipe = 'Removed recipe.',
  CreateUser = '`Created new user.',
}
export enum WebhookMessage {
  CreateRecipe = '`Created new recipe with id:',
  UpdateRecipe = 'Updated recipe with id:',
  RemoveRecipe = 'Removed recipe with id:',
  CreateUser = '`Created new user with id:',
}

interface WebhookEventPayload {
  event: WebhookEvent;
  message?: string;
  [param: string]: unknown;
}

class WebhooksService {
  async createWebhook(userId: string, userRole: string, resource: IWebhook) {
    resource.addedBy = userId;
    resource.role = userRole;
    return WebhooksDao.createWebhook(resource);
  }
  async getWebhook(filter: string) {
    let fulFilter: OmitIWebhook = { addedBy: filter };
    if (filter === 'Admin') {
      fulFilter = { role: filter };
    }

    return WebhooksDao.getUserWebhooks(fulFilter);
  }
  async update(id: string, resource: IWebhook) {
    return WebhooksDao.updateWebhook(id, resource);
  }

  async remove(id: string) {
    return WebhooksDao.removeByIdWebhook(id);
  }

  async sendEvent(filter: string, webhookEvent: WebhookEvent, id: string): Promise<void> {
    const webhooks = await this.getWebhook(filter);
    const event: WebhookEventPayload = { event: webhookEvent };
    if (webhookEvent == WebhookEvent.CreateRecipe) {
      event.message = `${WebhookMessage.CreateRecipe} ${id}`;
    }
    if (webhookEvent == WebhookEvent.UpdateRecipe) {
      event.message = `${WebhookMessage.UpdateRecipe} ${id}`;
    }
    if (webhookEvent == WebhookEvent.RemoveRecipe) {
      event.message = `${WebhookMessage.RemoveRecipe} ${id}`;
    }
    if (webhookEvent == WebhookEvent.CreateUser) {
      event.message = `${WebhookMessage.CreateUser} ${id}`;
    }

    if (webhooks) {
      webhooks.map(async (webhook: WebhookDocument) => {
        await axios.post(`${webhook.url}`, event);
      });
    }
  }
}

export default new WebhooksService();
