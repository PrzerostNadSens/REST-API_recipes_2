const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    first_name: { type: String, required: true },
    subname: { type: String, required: true },
    login: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {

        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('User', schema);