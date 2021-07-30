import { faker } from '../test.config';
import { Recipe, RecipeDocument } from '../../model/recipe.model';

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

const createRecipeTest = async function (id: string): Promise<string> {
  const recipeToSave = new Recipe(testRecipe);
  recipeToSave.addedBy = id;
  await recipeToSave.save();

  return recipeToSave.id;
};

const deleteAllRecipes = function () {
  return Recipe.deleteMany();
};

export { createRecipePayload, createRecipeTest, deleteAllRecipes };
