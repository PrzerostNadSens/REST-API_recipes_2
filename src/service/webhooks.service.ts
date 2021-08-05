import WebhooksDao from '../daos/webhooks.dao';
import { IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';
import axios from 'axios';

class WebhooksService {
  async create(userId: string, userRole: string, resource: IWebhook) {
    resource.addedBy = userId;
    resource.role = userRole;
    return WebhooksDao.createWebhook(resource);
  }
  async get(filter: string) {
    let fulFilter: OmitIWebhook = { addedBy: filter };
    if (filter === 'Admin') {
      fulFilter = { role: filter };
    }

    return WebhooksDao.getUserWebhooks(fulFilter);
  }

  async webhook(filter: string, event: string): Promise<void> {
    const webhooks = await this.get(filter);
    if (webhooks) {
      webhooks.map(async (webhook: WebhookDocument) => {
        await axios.post(`${webhook.url}`, event);
      });
    }
  }
}

export default new WebhooksService();
