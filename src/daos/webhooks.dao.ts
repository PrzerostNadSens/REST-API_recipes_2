import { Webhook, IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';

class WebhooksDao {
  async createWebhook(createWebhookBody: IWebhook): Promise<string> {
    const webhookToSave = new Webhook(createWebhookBody);
    await webhookToSave.save();

    return webhookToSave.id;
  }

  async getUserWebhooks(filter: OmitIWebhook): Promise<WebhookDocument[]> {
    const webhooks = await Webhook.find(filter);

    return webhooks;
  }
}

export default new WebhooksDao();
