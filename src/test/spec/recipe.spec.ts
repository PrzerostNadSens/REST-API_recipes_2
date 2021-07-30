import { chai, expect, app } from '../test.config';
import { createRecipePayload, createRecipeTest, deleteAllRecipes } from '../mocks/recipe.mocks';

import { bearerToken, id, deleteAllUsers } from '../mocks/user.mocks';

const authorization = 'Authorization';

beforeEach(async function () {
  await deleteAllRecipes();
  await deleteAllUsers();
});

afterEach(async function () {
  await deleteAllRecipes();
  await deleteAllUsers();
});

describe('Recipe', function () {
  describe('POST /recipes/', function () {
    it('should create recipe', async function () {
      const response = await chai
        .request(app)
        .post('/recipes')
        .set(authorization, bearerToken)
        .send(createRecipePayload);

      expect(response).to.have.status(201);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/', function () {
    it('should get recipes', async function () {
      const response = await chai.request(app).get('/recipes').set(authorization, bearerToken);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/all', function () {
    it('should get all recipes', async function () {
      const response = await chai.request(app).get('/recipes/all').set(authorization, bearerToken);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
  describe('GET /recipes/:recipeId', function () {
    it('should get recipe by id', async function () {
      const response = await chai
        .request(app)
        .get('/recipes/' + id)
        .set(authorization, bearerToken);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('PUT /recipes/:recipeId', function () {
    it('should put recipe by id', async function () {
      const response = await chai
        .request(app)
        .get('/recipes/' + id)
        .set(authorization, bearerToken)
        .send(createRecipePayload);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('DELETE /recipes/:recipeId', function () {
    it('should delete recipe by id', async function () {
      const response = await chai
        .request(app)
        .get('/recipes/' + id)
        .set(authorization, bearerToken);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
