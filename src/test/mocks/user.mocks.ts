import { faker } from '../test.config';

export const createUserPayload = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  login: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'Admin',
};
