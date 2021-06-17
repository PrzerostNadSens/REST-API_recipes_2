// recipeModel.js
var mongoose = require('mongoose');
// Setup schema
var recipeSchema = mongoose.Schema({
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
    }
});

recipeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {

        delete ret._id;
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);