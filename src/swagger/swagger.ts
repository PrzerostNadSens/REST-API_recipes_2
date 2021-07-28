import { SwaggerOptions } from 'swagger-ui-express';
import { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: 'REST-API_RECIPES',
    description:
      "Handling of cooking recipes Rafał Chmielewski.\n\nUsers who are not logged in can create an account themselves assigning themselves roles.\nThere are two types of users 'User' and 'Admin' in the application.\n'User' can only view, edit and delete his own recipes and create a new recipe.\n'Admin' can additionally display all recipes.\n\nJSON Web Token is used for authentication in the application.",
    version: '2.0.0',
  },
  host: 'localhost:8080',
  basePath: '/',
};

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ['./**/*routes.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
