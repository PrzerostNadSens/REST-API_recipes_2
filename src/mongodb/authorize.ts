import jwt from 'express-jwt';
import { User } from '../model/user.model';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const secret = process.env.JWT_SECRET!;
const HS256 = ['HS256'];

export interface AuthorizedRequest extends Request {
  user?: any;
}

export function returnId(req: AuthorizedRequest) {
  jwt({ secret, algorithms: HS256 });
  return req.user.id;
}
export function returnRole(req: AuthorizedRequest) {
  jwt({ secret, algorithms: HS256 });
  return req.user.role;
}

export function authorize(roles: string[] = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    jwt({ secret, algorithms: HS256 }),
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findById(returnId(req));

      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(StatusCodes.FORBIDDEN).json();
      }
      (req.user as any).role = user.role;
      next();
    },
  ];
}
