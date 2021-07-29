import { chai, expect, app } from '../test.config';
import { createRecipePayload, createRecipeTest, deleteAllRecipes } from '../mocks/recipe.mocks';

import { generateToken, deleteAllUsers } from '../mocks/user.mocks';

let token = '';
let id = '';

beforeEach('Add new user and return token', async function () {
  await deleteAllRecipes();
  await deleteAllUsers();
  const data = await generateToken();
  const _id = data._id;
  id = await createRecipeTest(_id);
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

  describe('GET /recipes/', function () {
    it('should get recipes', async function () {
      const response = await chai.request(app).get('/recipes').set('Authorization', token).send(createRecipePayload);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });

  describe('GET /recipes/', function () {
    it('should get recipe by id', async function () {
      const response = await chai
        .request(app)
        .get('/recipes/' + id)
        .set('Authorization', token)
        .send(createRecipePayload);

      expect(response).to.have.status(200);
      expect(response.error).to.be.false;
      expect(response.body).to.not.be.null;
    });
  });
});
