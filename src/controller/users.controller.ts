import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { IUser, UserDocument } from "../model/userModel";
import UsersService from "../service/users.service";

class UsersController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = <IUser>matchedData(req);

      const userId = await UsersService.create(data);

      return res.status(201).send({ id: userId });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }

  async generateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = <UserDocument>req.user;

    UsersService.generateToken(user)
      .then((jwtToken) => {
        res.json(jwtToken);
      })
      .catch(next);
  }
}

export default new UsersController();
