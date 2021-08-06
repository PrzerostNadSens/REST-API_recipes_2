import { Webhook, IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';

class WebhooksDao {
  async createWebhook(createWebhookBody: IWebhook): Promise<WebhookDocument | null> {
    const webhookToSave = new Webhook(createWebhookBody);

    if (await Webhook.findOne(createWebhookBody)) {
      return null;
    }

    return await webhookToSave.save();
  }

  async getUserWebhooks(filter: OmitIWebhook): Promise<WebhookDocument[]> {
    return Webhook.find(filter);
  }

  async updateWebhook(id: string, updateWebhookBody: IWebhook): Promise<WebhookDocument | null> {
    const url = updateWebhookBody.url;
    const webhookToUpdate = await Webhook.findByIdAndUpdate(id, { url }, { omitUndefined: true, new: true });

    if (await Webhook.findOne(updateWebhookBody)) {
      return null;
    }

    return webhookToUpdate!;
  }

  async removeByIdWebhook(id: string): Promise<WebhookDocument | null> {
    return Webhook.findByIdAndRemove(id);
  }
}

export default new WebhooksDao();
