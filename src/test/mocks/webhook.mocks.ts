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

const createWebhookTest = async function (id: string) {
  testWebhook.addedBy = id;
  testWebhook.role = 'Admin';
  const webhookToSave = new Webhook(testWebhook);
  await webhookToSave.save();

  return webhookToSave.id;
};

const deleteAllWebhooks = function () {
  return Webhook.deleteMany();
};

export { createWebhookPayload, createWebhookTest, deleteAllWebhooks };
