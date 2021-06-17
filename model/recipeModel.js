
var mongoose = require('mongoose');

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
    },
    added_by: {
        type: String,
        required: true
    }
});

recipeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.added_by;
        delete ret._id;
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);