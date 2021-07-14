import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model/userModel";

export async function authenticate_function(
  login: string,
  password: string,
  ipAddress: string
) {
  const user = await User.findOne({ login });

  if (!user) {
    return "Unauthorized";
  }
  if (!bcrypt.compareSync(password, user.password as any)) {
    return "Unauthorized";
  }

  const jwtToken = Token(user);
  return {
    jwtToken,
  };
}

export function Token(user: any) {
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}
