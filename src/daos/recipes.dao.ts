import { Recipe, IRecipe, OmitIRecipe, RecipeDocument } from '../model/recipe.model';

class RecipesDao {
  async createRecipe(createRecipeBody: IRecipe): Promise<RecipeDocument> {
    const recipeToSave = new Recipe(createRecipeBody);

    return await recipeToSave.save();
  }

  async getUserRecipes(filter: OmitIRecipe): Promise<RecipeDocument[]> {
    const recipes = await Recipe.find(filter);

    return recipes;
  }

  async getAllUserRecipes(filter: OmitIRecipe): Promise<RecipeDocument[]> {
    const recipes = await Recipe.find(filter);

    return recipes;
  }

  async findByIdRecipe(id: string): Promise<RecipeDocument> {
    const recipe = await Recipe.findById(id);

    return recipe!;
  }

  async updateRecipe(id: string, updateRecipeBody: IRecipe): Promise<RecipeDocument> {
    const name = updateRecipeBody.name;
    const { type, photo, recipe } = updateRecipeBody;
    const recipeToUpdate = await Recipe.findByIdAndUpdate(
      id,
      {
        name,
        type,
        photo,
        recipe,
      },
      { omitUndefined: true, new: true },
    );

    return recipeToUpdate!;
  }

  async removeByIdRecipe(id: string): Promise<RecipeDocument | null> {
    return Recipe.findByIdAndRemove(id);
  }
}

export default new RecipesDao();
