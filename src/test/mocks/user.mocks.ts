import { faker } from '../test.config';
import jwt from 'jsonwebtoken';

import { User, UserDocument } from '../../model/user.model';

const loginTest = 'dotcecdstów';
const passwordTest = 'tdfgdfgsgdfsdA.11';

const createUserPayload = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  login: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'Trudne.haslo12',
  role: 'Admin',
};

const testUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  login: loginTest,
  email: faker.internet.email(),
  password: '$2a$10$KrUPzb1p6PPBylea/JrGIe/0shAQmlcFppB9w8Ydzw2irEPTsjOfq',
  role: 'Admin',
};

const generateToken = async function () {
  const user = await createUserTest();
  const { _id } = user;
  const tokenActivityTime = '2h';
  const token = jwt.sign({ sub: _id, id: _id }, process.env.JWT_SECRET!, {
    expiresIn: tokenActivityTime,
  });
  return { token, _id };
};

const createUserTest = function (): Promise<UserDocument> {
  return new User(testUser).save();
};

const deleteAllUsers = function () {
  return User.deleteMany();
};

export { createUserPayload, generateToken, loginTest, passwordTest, createUserTest, deleteAllUsers };
