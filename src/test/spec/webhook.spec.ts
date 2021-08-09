import { chai, expect, app } from '../test.config';
import {
  createWebhookPayload,
  updateWebhookPayload,
  createWebhookTest,
  deleteAllWebhooks,
} from '../mocks/webhook.mocks';
import { StatusCodes } from 'http-status-codes';
import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';
let id = '';
const HEADER_AUTHORIZATION = 'Authorization';

beforeEach('Return token', async function () {
  if (token === '') {
    await deleteAllWebhooks();
    await deleteAllUsers();
    const data = await generateToken();
    const _id = data._id;
    id = await createWebhookTest(_id);
    token = `Bearer ${data.token}`;
  }
});

describe('Webhook', function () {
  describe('POST /webhooks/', function () {
    it('should return code 201', async function () {
      const response = await chai
        .request(app)
        .post('/webhooks')
        .set(HEADER_AUTHORIZATION, token)
        .send(createWebhookPayload);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('PUT/webhooks/', function () {
    it('should return code 200', async function () {
      const response = await chai
        .request(app)
        .put(`/webhooks/${id}`)
        .set(HEADER_AUTHORIZATION, token)
        .send(updateWebhookPayload);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('DELETE /webhooks/', function () {
    it('should return code 204', async function () {
      const response = await chai.request(app).delete(`/webhooks/${id}`).set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });

    it('should return code 404', async function () {
      const response = await chai.request(app).delete(`/webhooks/${id}`).set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
    });
  });
});
