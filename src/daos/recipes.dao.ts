import { Recipe, IRecipe, OmitIRecipe, RecipeDocument } from '../model/recipe.model';

class RecipesDao {
  async createRecipe(createRecipeBody: IRecipe): Promise<string> {
    const recipeToSave = new Recipe(createRecipeBody);
    await recipeToSave.save();

    return recipeToSave.id;
  }

  async getUserRecipes(filter: OmitIRecipe): Promise<RecipeDocument[]> {
    return await Recipe.find(filter);
  }

  async getAllUserRecipes(filter: any, limit: any, offset: any): Promise<RecipeDocument[]> {
    return await Recipe.find(filter).limit(limit).skip(offset);
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

  async removeByIdRecipe(id: string) {
    return Recipe.findByIdAndRemove(id);
  }
}

export default new RecipesDao();
