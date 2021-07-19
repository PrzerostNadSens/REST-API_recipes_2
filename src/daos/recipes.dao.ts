import debug from "debug";
import { Recipe, IRecipe, RecipeDocument } from "../model/recipeModel";
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

  async getUserRecipes(userId: string) {
    const recipes = await Recipe.find({
      added_by: userId,
    });

    return recipes;
  }

  async findByIdRecipe(id: string) {
    const recipe = await Recipe.findById(id);

    return recipe;
  }

  async updateRecipe(id: string, updateRecipeBody: IRecipe) {
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

    return recipeToUpdate;
  }

  async removeByIdRecipe(id: string) {
    const tak = await Recipe.findByIdAndRemove(id);

    return `${id} Removed`;
  }
}

export default new RecipesDao();
