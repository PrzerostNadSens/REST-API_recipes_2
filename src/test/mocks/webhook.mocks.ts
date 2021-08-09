import { faker } from '../test.config';
import { Webhook } from '../../model/webhook.model';

const createWebhookPayload = {
  url: faker.internet.url(),
};

const testWebhook = {
  url: 'https://webhook.site/#!/baff8b57-0b01-4955-aa1d-56b68025e6d6/19100730-9f40-4fd2-8a3c-5ed913ff3a39/1',
  addedBy: '',
  role: '',
};

const createWebhookTest = async function (userId: string): Promise<string> {
  testWebhook.addedBy = userId;
  testWebhook.role = 'Admin';
  const { id } = await new Webhook(testWebhook).save();

  return id;
};

const deleteAllWebhooks = function () {
  return Webhook.deleteMany();
};

export { createWebhookPayload, createWebhookTest, deleteAllWebhooks };
