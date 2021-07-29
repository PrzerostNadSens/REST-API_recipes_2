import { faker } from '../test.config';

import { Recipe } from '../../model/recipeModel';

const createRecipePayload = {
  name: faker.name.title(),
  type: faker.name.findName(),
  photo: faker.internet.url(),
  recipe: faker.random.words(),
};

// export const createRecipePayload = {
//     name: 'gfd', //faker.name.title(),
//     type: 'gfd', //faker.name.findName(),
//     photo:
//       'https://www.kwestiasmaku.com/sites/v123.kwestiasmaku.com/files/styles/zdjecie_glowne/public/gumbo.jpg?itok=2-d_W8VD', //faker.internet.url(),
//     recipe: 'gh', //faker.random.words(),
//   };

const deleteAllRecipes = function () {
  return Recipe.deleteMany();
};

export { createRecipePayload, deleteAllRecipes };
