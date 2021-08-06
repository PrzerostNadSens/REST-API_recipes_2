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

const createRecipeTest = async function (id: string) {
  testRecipe.addedBy = id;
  const recipeToSave = new Recipe(testRecipe);
  await recipeToSave.save();

  return recipeToSave.id;
};

const deleteAllRecipes = function () {
  return Recipe.deleteMany();
};

export { createRecipePayload, createRecipeTest, deleteAllRecipes };
