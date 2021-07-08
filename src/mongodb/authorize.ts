import jwt from "express-jwt";
import { secret } from "../../config.json";
import db from "./db";
import { Request, Response, NextFunction } from "express";

export default authorize;

export function authorize(roles: string[] = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    jwt({ secret, algorithms: ["HS256"] }),
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await db.User.findById((req.user as any).id);

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json();
      }
      (req.user as any).role = user.role;
      next();
    },
  ];
}
