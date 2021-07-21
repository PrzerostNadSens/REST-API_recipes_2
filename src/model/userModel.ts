import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  first_name: string;
  subname: string;
  login: string;
  email: string;
  password?: string;
  role: string;
}

export interface UserDocument extends IUser, Document {}

const schema = new Schema({
  first_name: { type: String, required: true },
  subname: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, ret: UserDocument) {
    delete ret._id;
    delete ret.password;
  },
});

export const User = mongoose.model<UserDocument>("User", schema);
