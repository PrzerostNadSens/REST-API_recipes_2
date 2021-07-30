import { Schema, Document, model } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  password?: string;
  role: string;
}

export interface UserDocument extends IUser, Document {}

const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: unknown, ret: UserDocument) {
    delete ret._id;
    delete ret.password;
  },
});

export const User = model<UserDocument>('User', schema);
