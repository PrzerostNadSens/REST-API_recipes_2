import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";
import { object } from "@hapi/joi";

export async function authenticate_function(
  login: string,
  password: string,
  ipAddress: string
) {
  //const userData: CreateUserDto = request.body;
  //if (await user.findOne({ login: login }))
  //tutaj były klamry
  //const user: User = await User.findOne({ login: login });
  const user = await User.findOne({ login });

  if (!user) {
    throw "Nieprawidłowy login";
  }
  if (!bcrypt.compareSync(password, user.password as any)) {
    throw "Nieprawidłowe hasło";
  }

  const jwtToken = Token(user);
  return {
    //...informations(user),
    jwtToken,
  };
}

export function Token(user: any) {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}
/*
async function getById(id: string) {
  const user = await getUser(id);
  return informations(user);
}
*/
function informations(user: any) {
  const { id, first_name, subname, login, role } = user;
  return { id, first_name, subname, login, role };
}
