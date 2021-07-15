import debug from "debug";
import { Recipe, IRecipe } from "../model/recipeModel";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import HttpException from "../exceptions/HttpException";
const log: debug.IDebugger = debug("app:in-memory-dao");

class RecipesDao {
  constructor() {
    log("Created new instance of RecipesDao");
  }
  async createRecipe(createRecipeBody: IRecipe) {
    const recipeToSave = new Recipe(createRecipeBody);
    await recipeToSave.save();
    return recipeToSave.id;
  }

  async updateRecipe(id: string, updateRecipeBody: IRecipe, userId: string) {
    const name = updateRecipeBody.name;
    let { type, photo, recipe } = updateRecipeBody;
    const recipeToUpdate = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        type,
        photo,
        recipe,
      },
      { omitUndefined: true, new: true }
    );
    if (!recipeToUpdate) {
      throw new PostNotFoundException(id);
    }
    if (recipeToUpdate.added_by != userId) {
      throw new HttpException(404, "Unauthorized");
    }
    return recipeToUpdate;
  }

  async removeRecipe(id: string, userId: string) {
    const recipeToRemove = await Recipe.findById(id);
    if (!recipeToRemove) {
      throw new PostNotFoundException(id);
    }
    if (recipeToRemove.added_by != userId) {
      throw new HttpException(404, "Unauthorized");
    }
    recipeToRemove.remove();
    return new HttpException(200, `${id} Removed`);
  }
}

export default new RecipesDao();
