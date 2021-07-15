import RecipesDao from "../daos/recipes.dao";
import { IRecipe } from "../model/recipeModel";

class RecipesService {
  async create(resource: IRecipe) {
    return RecipesDao.createRecipe(resource);
  }

  async update(id: string, resource: IRecipe) {
    return RecipesDao.updateRecipe(id, resource);
  }

  async remove(id: string, userId: string) {
    return RecipesDao.removeRecipe(id, userId);
  }
}

export default new RecipesService();
