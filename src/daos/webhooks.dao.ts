import { Webhook, IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';

class WebhooksDao {
  async createWebhook(createWebhookBody: IWebhook): Promise<string> {
    const webhookToSave = new Webhook(createWebhookBody);
    const webhook = await Webhook.findOne(createWebhookBody);
    if (webhook) {
      return '';
    }

    await webhookToSave.save();

    return webhookToSave.id;
  }

  async getUserWebhooks(filter: OmitIWebhook): Promise<WebhookDocument[]> {
    const webhooks = await Webhook.find(filter);

    return webhooks;
  }

  async updateWebhook(id: string, updateWebhookBody: IWebhook): Promise<WebhookDocument> {
    const url = updateWebhookBody.url;
    const webhookToUpdate = await Webhook.findByIdAndUpdate(
      id,
      {
        url,
      },
      { omitUndefined: true, new: true },
    );

    return webhookToUpdate!;
  }

  async removeByIdWebhook(id: string) {
    return Webhook.findByIdAndRemove(id);
  }
}

export default new WebhooksDao();
