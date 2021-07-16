import debug from "debug";
import { IUser, User } from "../model/userModel";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  users: Array<IUser> = [];

  constructor() {
    log("Created new instance of UsersDao");
  }

  async createUser(createUserBody: IUser) {
    const userToSave = new User(createUserBody);
    await userToSave.save();
    return userToSave.id;
  }
}

export default new UsersDao();
