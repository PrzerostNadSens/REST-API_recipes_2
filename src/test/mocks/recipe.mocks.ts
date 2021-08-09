import { faker } from '../test.config';
import { Recipe } from '../../model/recipe.model';

const createRecipePayload = {
  name: faker.name.title(),
  type: faker.name.findName(),
  photo: faker.internet.url(),
  recipe: faker.random.words(),
};

const testRecipe = {
  name: faker.name.title(),
  type: faker.name.findName(),
  photo: faker.internet.url(),
  recipe: faker.random.words(),
  addedBy: '',
};

const createRecipeTest = async function (userId: string): Promise<string> {
  testRecipe.addedBy = userId;
  const { id } = await new Recipe(testRecipe).save();

  return id;
};

const deleteAllRecipes = function () {
  return Recipe.deleteMany();
};

export { createRecipePayload, createRecipeTest, deleteAllRecipes };
