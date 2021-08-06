import { chai, expect, app } from '../test.config';
import { createWebhookPayload, createWebhookTest, deleteAllWebhooks } from '../mocks/webhook.mocks';
import { StatusCodes } from 'http-status-codes';

import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';
let id = '';

beforeEach('Add new user and return token', async function () {
  await deleteAllWebhooks();
  await deleteAllUsers();
  const data = await generateToken();
  const _id = data._id;
  id = await createWebhookTest(_id);
  token = `Bearer ${data.Token}`;
});

afterEach('Delete all webhooks and all users', async function () {
  await deleteAllWebhooks();
  await deleteAllUsers();
});

describe('Webhook', function () {
  describe('POST /webhooks/', function () {
    it('should create webhook', async function () {
      const response = await chai.request(app).post('/webhooks').set('Authorization', token).send(createWebhookPayload);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('PUT/webhooks/', function () {
    it('should put webhook by id', async function () {
      const response = await chai
        .request(app)
        .put('/webhooks/' + id)
        .set('Authorization', token)
        .send(createWebhookPayload);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('DELETE/webhooks/', function () {
    it('should delete webhook by id', async function () {
      const response = await chai
        .request(app)
        .delete('/webhooks/' + id)
        .set('Authorization', token);

      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
