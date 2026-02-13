import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Lead Notes API',
    version: '1.0.0',
    description: 'API Documentation for the Lead Notes MERN Application',
  },
  servers: [
    {
      url: '/api', 
      description: 'Default Server (Auto-detects Local vs Live)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Note: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          _id: { type: 'string', description: 'MongoDB Unique ID' },
          title: { type: 'string' },
          content: { type: 'string' },
          imageUrl: { type: 'string', description: 'Cloudinary URL' },
        },
      },
    },
  },
  paths: {
    '/notes': {
      get: {
        summary: 'Fetch all notes',
        tags: ['Notes'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'A list of notes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Note' },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new note',
        tags: ['Notes'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                  image: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Note created successfully' },
        },
      },
    },
    '/notes/{id}': {
      delete: {
        summary: 'Delete a note',
        tags: ['Notes'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'Note ID',
          },
        ],
        responses: {
          200: { description: 'Note deleted successfully' },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [], 
};

export const specs = swaggerJsdoc(options);