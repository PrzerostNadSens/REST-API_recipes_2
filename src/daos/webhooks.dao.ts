import { Webhook, IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';

class WebhooksDao {
  async createWebhook(createWebhookBody: IWebhook): Promise<string> {
    const webhookToSave = new Webhook(createWebhookBody);
    await webhookToSave.save();
    const id = webhookToSave.id;
    return webhookToSave.id;
  }

  async getUserWebhooks(filter: OmitIWebhook): Promise<WebhookDocument[]> {
    return Webhook.find(filter);
  }
}

export default new WebhooksDao();
