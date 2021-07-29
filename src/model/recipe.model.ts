import { Schema, Document, model } from 'mongoose';
export interface IRecipe {
  name: string;
  type: string;
  photo: string;
  recipe: string;
  addedBy?: string;
}

export interface RecipeDocument extends IRecipe, Document {}

export type OmitIRecipe = Omit<IRecipe, 'name' | 'type' | 'photo' | 'recipe'>;

export function PartialIRecipe(recipe: OmitIRecipe, fieldsToUpdate: Partial<OmitIRecipe>) {
  return { ...recipe, ...fieldsToUpdate };
}

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  photo: {
    type: String,
  },
  recipe: {
    type: String,
    required: true,
  },
  addedBy: {
    type: String,
    required: true,
  },
});

recipeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, ret: RecipeDocument) {
    delete ret._id;
    delete ret.addedBy;
  },
});

export const Recipe = model<RecipeDocument>('Recipe', recipeSchema);
