import WebhooksDao from '../daos/webhooks.dao';
import { IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';
import { RecipeDocument } from '../model/recipe.model';
import axios from 'axios';
import { UserDocument } from '../model/user.model';

export enum WebhookEvent {
  CreateRecipe = 'Created new recipe.',
  UpdateRecipe = 'Updated recipe.',
  RemoveRecipe = 'Removed recipe.',
  CreateUser = 'Created new user.',
}
export enum WebhookMessage {
  RemoveRecipe = 'Removed recipe with id:',
  CreateUser = 'Created new user with id:',
}

interface WebhookEventPayload {
  event: WebhookEvent;
  message?: string;
  [param: string]: unknown;
}

export class WebhooksService {
  async createWebhook(userId: string, userRole: string, resource: IWebhook): Promise<string> {
    resource.addedBy = userId;
    resource.role = userRole;
    return WebhooksDao.createWebhook(resource);
  }
  async getWebhook(filter: string): Promise<WebhookDocument[]> {
    let fulFilter: OmitIWebhook = { addedBy: filter };
    if (filter === 'Admin') {
      fulFilter = { role: filter };
    }

    return WebhooksDao.getUserWebhooks(fulFilter);
  }
  async update(id: string, resource: IWebhook): Promise<WebhookDocument> {
    return WebhooksDao.updateWebhook(id, resource);
  }

  async remove(id: string): Promise<WebhookDocument | null> {
    return WebhooksDao.removeByIdWebhook(id);
  }

  async sendEvent(
    filter: string,
    webhookEvent: WebhookEvent,
    resource: RecipeDocument | UserDocument | string,
  ): Promise<void> {
    const webhooks = await this.getWebhook(filter);
    const event: WebhookEventPayload = { event: webhookEvent };
    if (webhookEvent == WebhookEvent.CreateRecipe) {
      event.recipe = resource;
    }
    if (webhookEvent == WebhookEvent.UpdateRecipe) {
      event.recipe = resource;
    }
    if (webhookEvent == WebhookEvent.RemoveRecipe) {
      event.message = `${WebhookMessage.RemoveRecipe} ${resource}`;
    }
    if (webhookEvent == WebhookEvent.CreateUser) {
      event.message = `${WebhookMessage.CreateUser} ${resource}`;
    }

    if (webhooks) {
      webhooks.map(async (webhook: WebhookDocument) => {
        await axios.post(`${webhook.url}`, event);
      });
    }
  }
}

export default new WebhooksService();
