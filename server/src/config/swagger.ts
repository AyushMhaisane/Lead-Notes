import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lead Notes API',
      version: '1.0.0',
      description: 'API Documentation for the Lead Notes MERN Application',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: [path.join(__dirname, '../docs/*.yaml')],
};

export const specs = swaggerJsdoc(options);
