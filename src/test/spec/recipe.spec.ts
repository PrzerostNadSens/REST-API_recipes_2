import { chai, expect, app } from '../test.config';
import { createRecipePayload, createRecipeTest, deleteAllRecipes } from '../mocks/recipe.mocks';
import { StatusCodes } from 'http-status-codes';

import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';
let id = '';

beforeEach('Add new user and return token-Recipe', async function () {
  await deleteAllRecipes();
  await deleteAllUsers();
  const data = await generateToken();
  const _id = data._id;
  id = await createRecipeTest(_id);
  token = `Bearer ${data.Token}`;
});

afterEach('Delete all recipes and all users', async function () {
  await deleteAllRecipes();
  //await deleteAllUsers();
});

describe('Recipe', function () {
  describe('POST /recipes/', function () {
    it('should create recipe', async function () {
      const response = await chai.request(app).post('/recipes').set('Authorization', token).send(createRecipePayload);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/', function () {
    it('should get recipes', async function () {
      const response = await chai.request(app).get('/recipes').set('Authorization', token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/all', function () {
    it('should get all recipes', async function () {
      const response = await chai.request(app).get('/recipes/all').set('Authorization', token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
  describe('GET /recipes/', function () {
    it('should get recipe by id', async function () {
      const response = await chai
        .request(app)
        .get('/recipes/' + id)
        .set('Authorization', token);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('PUT/recipes/', function () {
    it('should put recipe by id', async function () {
      const response = await chai
        .request(app)
        .put('/recipes/' + id)
        .set('Authorization', token)
        .send(createRecipePayload);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('DELETE/recipes/', function () {
    it('should delete recipe by id', async function () {
      const response = await chai
        .request(app)
        .delete('/recipes/' + id)
        .set('Authorization', token);

      expect(response).to.have.status(StatusCodes.NO_CONTENT);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
