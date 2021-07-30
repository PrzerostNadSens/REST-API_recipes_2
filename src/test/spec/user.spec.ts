import { chai, expect, app } from '../test.config';
import { createUserPayload, createUserTest, loginTest, passwordTest, deleteAllUsers } from '../mocks/user.mocks';

beforeEach('Add user and get token', async function () {
  await deleteAllUsers();
  await createUserTest();
});

afterEach('Delete all users', async function () {
  await deleteAllUsers();
});

describe('User', function () {
  describe('POST /users/', function () {
    it('should create user', async function () {
      const response = await chai.request(app).post('/users').send(createUserPayload);

      expect(response).to.have.status(201);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('POST /users/login', function () {
    it('should login user', async function () {
      const response = await chai.request(app).post('/users/login').auth(loginTest, passwordTest);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
