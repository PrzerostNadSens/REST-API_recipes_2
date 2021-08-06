import { Webhook, IWebhook, OmitIWebhook, WebhookDocument } from '../model/webhook.model';

class WebhooksDao {
  async createWebhook(createWebhookBody: IWebhook): Promise<string> {
    const webhookToSave = new Webhook(createWebhookBody);

    if (Webhook.findOne(createWebhookBody)) {
      return '';
    }

    const { id } = await webhookToSave.save();

    return id;
  }

  async getUserWebhooks(filter: OmitIWebhook): Promise<WebhookDocument[]> {
    return Webhook.find(filter);
  }

  async updateWebhook(id: string, updateWebhookBody: IWebhook): Promise<WebhookDocument> {
    const url = updateWebhookBody.url;
    const webhookToUpdate = await Webhook.findByIdAndUpdate(id, { url }, { omitUndefined: true, new: true });

    return webhookToUpdate!;
  }

  async removeByIdWebhook(id: string): Promise<WebhookDocument | null> {
    return Webhook.findByIdAndRemove(id);
  }
}

export default new WebhooksDao();
