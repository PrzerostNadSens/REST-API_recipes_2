import { faker } from '../test.config';

export const createUserPayload = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  login: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: 'Admin'
};
