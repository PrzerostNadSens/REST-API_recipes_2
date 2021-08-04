import WebhooksDao from '../daos/webhooks.dao';
import { IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';
import axios from 'axios';

class WebhooksService {
  async create(resource: IWebhook) {
    return WebhooksDao.createWebhook(resource);
  }
  async get(userId: string) {
    const fulFilter: OmitIWebhook = { addedBy: userId };

    return WebhooksDao.getUserWebhooks(fulFilter);
  }

  async webhook(userId: string, event: string): Promise<void> {
    const webhooks = await this.get(userId);
    if (webhooks) {
      webhooks.map(async (webhook: WebhookDocument) => {
        await axios.post(`${webhook.url}`, event);
      });
    }
  }
}

export default new WebhooksService();
