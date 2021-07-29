import { chai, expect, app } from '../test.config';
import { createRecipePayload, deleteAllRecipes } from '../mocks/recipe.mocks';

import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';

beforeEach('Add new user and return token', async function () {
  await deleteAllUsers();
  const data = await generateToken();

  token = `Bearer ${data.Token}`;
});

afterEach('Delete all recipes and all users', async function () {
  await deleteAllRecipes();
  await deleteAllUsers();
});

describe('Recipe', function () {
  describe('POST /recipes/', function () {
    it('should create recipe', async function () {
      const response = await chai.request(app).post('/recipes').set('Authorization', token).send(createRecipePayload);
      expect(response).to.have.status(201);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
