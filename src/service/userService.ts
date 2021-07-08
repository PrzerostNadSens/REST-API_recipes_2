import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../mongodb/db";
import { object } from "@hapi/joi";

export default {
  authenticate,
  //getById,
};

async function authenticate(
  login: string,
  password: string,
  ipAddress: string
) {
  //tutaj były klamry
  const user = await db.User.findOne({ login });

  if (!user) {
    throw "Nieprawidłowy login";
  }
  if (!bcrypt.compareSync(password, user.password)) {
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
