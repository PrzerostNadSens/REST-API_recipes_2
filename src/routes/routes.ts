import express, { Request, Response } from 'express';
import { swaggerSpec } from '../swagger/swagger';
import swaggerUi from 'swagger-ui-express';
import recipeRoutes from './recipes.routes';
import userRoutes from './users.routes';
import webhookRoutes from './webhooks.routes';
import { StatusCodes } from 'http-status-codes';

export const routes = express();

routes.get('/', (req: Request, res: Response) => res.send('Obsługa przepisów kuchennych Rafał Chmielewski'));

routes.use('/recipes', recipeRoutes);

routes.use('/users', userRoutes);

routes.use('/webhooks', webhookRoutes);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes.use('*', (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: `Make sure url is correct!`,
  });
});
