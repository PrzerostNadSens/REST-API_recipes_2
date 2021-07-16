import RecipesDao from "../daos/recipes.dao";
import { IRecipe } from "../model/recipeModel";

class RecipesService {
  async create(resource: IRecipe) {
    return RecipesDao.createRecipe(resource);
  }
  async get(userId: string) {
    return RecipesDao.getUserRecipes(userId);
  }

  async findById(id: string) {
    return RecipesDao.findByIdRecipe(id);
  }

  async update(id: string, resource: IRecipe) {
    return RecipesDao.updateRecipe(id, resource);
  }

  async remove(id: string) {
    return RecipesDao.removeByIdRecipe(id);
  }
}

export default new RecipesService();
