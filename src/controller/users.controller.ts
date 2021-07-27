import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { IUser } from "../model/userModel";
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

  async authenticateSchema(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, password } = <IUser>matchedData(req);

      UsersService.validateRequest(login, password!, next);
    } catch (e) {
      if (e.code(401)) {
        return res.status(401).send(
          e.message({
            message: `Validation error: ${e.details
              .map((x: any) => x.message)
              .join(", ")}`,
          })
        );
      }
      return res.status(500).send(e.message);
    }
  }

  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { login, password } = req.body;

    UsersService.authenticate(login, password)
      .then((jwtToken) => {
        if (!jwtToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        res.json(jwtToken);
      })
      .catch(next);
  }
}

export default new UsersController();
