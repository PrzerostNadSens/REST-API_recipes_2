import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;
export interface IRecipe {
  name: string;
  type: string;
  photo: string;
  recipe: string;
  added_by?: string;
}

export interface RecipeDocument extends IRecipe, Document {}

export type OmitIRecipe = Omit<IRecipe, 'name' | 'type' | 'photo' | 'recipe'>;

export function PartialIRecipe(
  recipe: OmitIRecipe,
  fieldsToUpdate: Partial<OmitIRecipe>
) {
  return { ...recipe, ...fieldsToUpdate };
}

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  photo: {
    type: String
  },
  recipe: {
    type: String,
    required: true
  },
  added_by: {
    type: String,
    required: true
  }
});

recipeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, ret: RecipeDocument) {
    delete ret._id;
    delete ret.added_by;
  }
});

export const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);
