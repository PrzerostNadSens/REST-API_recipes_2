import { NextFunction } from "express";

export default error;

export function error(
  err: Error,
  req: Request,
  res: Request,
  next: NextFunction
) {
  switch (true) {
    case typeof err === "string":
      const is404 = err.toLowerCase().endsWith("nie znaleziono");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    case err.name === "ValidationError":
      return res.status(400).json({ message: err.message });
    case err.name === "UnauthorizedError":
      return res.status(401).json({ message: "Nieautoryzowany" });
    default:
      return res.status(500).json({ message: err.message });
  }
}
