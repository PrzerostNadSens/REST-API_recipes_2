import { faker } from '../test.config';
import { Recipe } from '../../model/recipeModel';

const createRecipePayload = {
  name: faker.name.title(),
  type: faker.name.findName(),
  photo: faker.internet.url(),
  recipe: faker.random.words(),
};

const createRecipePayloadTest = {
  name: faker.name.title(),
  type: faker.name.findName(),
  photo: faker.internet.url(),
  recipe: faker.random.words(),
  added_by: '',
};

const createRecipeTest = async function (id: string) {
  createRecipePayloadTest.added_by = id;
  const recipeToSave = new Recipe(createRecipePayloadTest);
  await recipeToSave.save();

  return recipeToSave.id;
};

const deleteAllRecipes = function () {
  return Recipe.deleteMany();
};

export { createRecipePayload, createRecipeTest, deleteAllRecipes };
