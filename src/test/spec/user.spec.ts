import { chai, expect, app } from '../test.config';
import { createUserPayload, createUserTest, loginTest, passwordTest, deleteAllUsers } from '../mocks/user.mocks';
import { StatusCodes } from 'http-status-codes';

beforeEach(async function () {
  await deleteAllUsers();
  await createUserTest();
});

afterEach(async function () {
  await deleteAllUsers();
});

describe('User', function () {
  describe('POST /users/', function () {
    it('should create user', async function () {
      const response = await chai.request(app).post('/users').send(createUserPayload);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('POST /users/login', function () {
    it('should login user', async function () {
      const response = await chai.request(app).post('/users/login').auth(loginTest, passwordTest);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
