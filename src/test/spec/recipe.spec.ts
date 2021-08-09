import { chai, expect, app } from '../test.config';
import { createRecipePayload, createRecipeTest, deleteAllRecipes } from '../mocks/recipe.mocks';
import { StatusCodes } from 'http-status-codes';

import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';
let id = '';
const HEADER_AUTHORIZATION = 'Authorization';

beforeEach('Add new user and return token-Recipe', async function () {
  if (token === '') {
    await deleteAllRecipes();
    await deleteAllUsers();
    const data = await generateToken();
    const _id = data._id;
    id = await createRecipeTest(_id);
    token = `Bearer ${data.token}`;
  }
});

describe('Recipe', function () {
  describe('POST /recipes/', function () {
    it('should create recipe', async function () {
      const response = await chai
        .request(app)
        .post('/recipes')
        .set(HEADER_AUTHORIZATION, token)
        .send(createRecipePayload);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/', function () {
    it('should get recipes', async function () {
      const response = await chai.request(app).get('/recipes').set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/all', function () {
    it('should get all recipes', async function () {
      const response = await chai.request(app).get('/recipes/all').set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
  describe('GET /recipes/:recipeId', function () {
    it('should get recipe by id', async function () {
      const response = await chai.request(app).get(`/recipes/${id}`).set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('PUT/recipes/:recipeId', function () {
    it('should return code 200', async function () {
      const response = await chai
        .request(app)
        .put(`/recipes/${id}`)
        .set(HEADER_AUTHORIZATION, token)
        .send(createRecipePayload);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('DELETE/recipes/:recipeId', function () {
    it('should return code 204', async function () {
      const response = await chai.request(app).delete(`/recipes/${id}`).set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
    it('should return code 404', async function () {
      const response = await chai.request(app).delete(`/recipes/${id}`).set(HEADER_AUTHORIZATION, token);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
    });
  });
});
