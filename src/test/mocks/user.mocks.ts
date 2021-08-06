import { faker } from '../test.config';
import jwt from 'jsonwebtoken';
import { User, UserDocument } from '../../model/user.model';

const loginTest = 'tdfgdfgsgdfsdA.11';
const passwordTest = 'tdfgdfgsgdfsdA.11';

const createUserPayload = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  login: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'tdfgdfgsgdfsdA.11',
  role: 'Admin',
};

const testUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  login: loginTest,
  email: faker.internet.email(),
  password: '$2a$10$iwpVFn5v1gX5gXARfNNMte1jrM65tA8nQTRVybJ0INthn0/FBH11i',
  role: 'Admin',
};

const generateToken = async function (_id: any) {
  const tokenActivityTime = '2h';
  const token = jwt.sign({ sub: _id, id: _id, role: 'Admin' }, process.env.JWT_SECRET!, {
    expiresIn: tokenActivityTime,
  });
  return token;
};

const generateId = async function () {
  const { _id } = await createUserTest();
  return _id;
};

const createUserTest = function () {
  return new User(testUser).save();
};
const id = generateId();
const token = generateToken(id);
const bearerToken = `Bearer ${token}`;

const deleteAllUsers = function () {
  return User.deleteMany();
};

export { createUserPayload, testUser, bearerToken, id, loginTest, passwordTest, createUserTest, deleteAllUsers };
