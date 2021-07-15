import RecipesDao from "../daos/recipes.dao";
import { IRecipe } from "../model/recipeModel";

class RecipesService {
  async create(resource: IRecipe) {
    return RecipesDao.createRecipe(resource);
  }
  async view(userId: string) {
    return RecipesDao.indexRecipe(userId);
  }

  async viewById(id: string, userId: string) {
    return RecipesDao.findByIdRecipe(id, userId);
  }

  async update(id: string, resource: IRecipe, userId: string) {
    return RecipesDao.updateRecipe(id, resource, userId);
  }

  async remove(id: string, userId: string) {
    return RecipesDao.removeRecipe(id, userId);
  }
}

export default new RecipesService();
