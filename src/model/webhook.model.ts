import { Schema, Document, model } from 'mongoose';

export interface IWebhook {
  url: string;
  addedBy?: string;
}

export interface WebhookDocument extends IWebhook, Document {}

export type OmitIWebhook = Omit<IWebhook, 'url'>;

const webhookSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
});

webhookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, webhook: WebhookDocument) {
    delete webhook._id;
    delete webhook.addedBy;
  },
});

export const Webhook = model<WebhookDocument>('Webhook', webhookSchema);
