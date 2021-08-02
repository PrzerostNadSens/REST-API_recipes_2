import express, { NextFunction, Request, Response } from 'express';
import { swaggerSpec } from '../swagger/swagger';
import swaggerUi from 'swagger-ui-express';
import recipeRoutes from './recipes.routes';
import userRoutes from './users.routes';
import { StatusCodes } from 'http-status-codes';

export const routes = express();
const allowedMethods = ['GET', 'PUT', 'POST', 'DELETE'];

routes.use((req: Request, res: Response, next: NextFunction) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      message: `Method Not Allowed!`,
    });
  }
  return next();
});
routes.get('/', (req: Request, res: Response) => res.send('Obsługa przepisów kuchennych Rafał Chmielewski'));

routes.use('/recipes', recipeRoutes);

routes.use('/users', userRoutes);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes.get('*', (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: `Make sure url is correct!`,
  });
});
