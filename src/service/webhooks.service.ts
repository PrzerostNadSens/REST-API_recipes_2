import WebhooksDao from '../daos/webhooks.dao';
import { IWebhook, OmitIWebhook } from '../model/webhook.model';

class WebhooksService {
  async create(resource: IWebhook) {
    return WebhooksDao.createWebhook(resource);
  }
  async get(userId: string) {
    const fulFilter: OmitIWebhook = { addedBy: userId };

    return WebhooksDao.getUserWebhooks(fulFilter);
  }
}

export default new WebhooksService();
