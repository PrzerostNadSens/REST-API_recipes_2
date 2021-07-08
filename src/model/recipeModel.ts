var mongoose = require("mongoose");

export interface Recipe {
  _id?: string;
  name: string;
  type: string;
  photo: string;
  recipe: string;
  added_by?: string;
}

var recipeSchema = mongoose.Schema({
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
  added_by: {
    type: String,
    required: true,
  },
});

recipeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, ret: Recipe) {
    delete ret.added_by;
    delete ret._id;
  },
});

export default mongoose.model("Recipe", recipeSchema);
