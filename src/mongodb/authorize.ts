import jwt from "express-jwt";
import { secret } from "../../config.json";
import { User } from "../model/userModel";
import { Request, Response, NextFunction } from "express";

interface AuthorizedRequest extends Request {
  user?: any;
}

function returnId(req: AuthorizedRequest) {
  jwt({ secret, algorithms: ["HS256"] });
  return req.user.id;
}

export function authorize(roles: string[] = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return [
    jwt({ secret, algorithms: ["HS256"] }),
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(returnId(req));

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json();
      }
      (req.user as any).role = user.role;
      next();
    },
  ];
}
