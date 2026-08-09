const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Expense Tracker API',
    version: '1.0.0',
    description: 'application REST API for the web application.'
  },
  servers: [
    {
      url: 'http://localhost:4000/api',
      description: 'Local development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      RegisterRequest: {
        type: 'object',
        required: ['fullName', 'email', 'password'],
        properties: {
          fullName: { type: 'string', example: 'Christos Tsopelas' },
          email: { type: 'string', example: 'tsopelasat@gmail.com' },
          password: { type: 'string', example: '12345' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'tsopelasat@gmail.com' },
          password: { type: 'string', example: '12345' }
        }
      },
      CategoryRequest: {
        type: 'object',
        required: ['name', 'type'],
        properties: {
          name: { type: 'string', example: 'Τρόφιμα' },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'], example: 'EXPENSE' }
        }
      },
      TransactionRequest: {
        type: 'object',
        required: ['title', 'amount', 'type', 'date', 'categoryId'],
        properties: {
          title: { type: 'string', example: 'Σούπερ Μάρκετ' },
          amount: { type: 'number', example: 45.5 },
          type: { type: 'string', enum: ['INCOME', 'EXPENSE'], example: 'EXPENSE' },
          date: { type: 'string', example: '2026-07-07' },
          note: { type: 'string', example: 'Αγορές εβδομάδας' },
          categoryId: { type: 'integer', example: 1 }
        }
      }
    }
  },
  paths: {
    '/health': { get: { summary: 'Health check', responses: { '200': { description: 'Backend is running' } } } },
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } } },
        responses: { '201': { description: 'User created successfully' }, '400': { description: 'Validation or business error' } }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login user',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
        responses: { '200': { description: 'Login successful' }, '400': { description: 'Invalid credentials' } }
      }
    },
    '/auth/me': {
      get: {
        summary: 'Get current user',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Current user returned' }, '401': { description: 'Unauthorized' } }
      }
    },
    '/categories': {
      get: {
        summary: 'Get all categories for logged in user',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Categories returned' }, '401': { description: 'Unauthorized' } }
      },
      post: {
        summary: 'Create category',
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryRequest' } } } },
        responses: { '201': { description: 'Category created' }, '400': { description: 'Validation error' }, '401': { description: 'Unauthorized' } }
      }
    },
    '/categories/{id}': {
      delete: {
        summary: 'Delete category',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Category deleted' }, '401': { description: 'Unauthorized' } }
      }
    },
    '/transactions': {
      get: {
        summary: 'Get all transactions for logged in user',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Transactions returned' }, '401': { description: 'Unauthorized' } }
      },
      post: {
        summary: 'Create transaction',
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionRequest' } } } },
        responses: { '201': { description: 'Transaction created' }, '400': { description: 'Validation error' }, '401': { description: 'Unauthorized' } }
      }
    },
    '/transactions/{id}': {
      delete: {
        summary: 'Delete transaction',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { description: 'Transaction deleted' }, '401': { description: 'Unauthorized' } }
      }
    },
    '/transactions/summary': {
      get: {
        summary: 'Get dashboard/report summary',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'Summary returned' }, '401': { description: 'Unauthorized' } }
      }
    }
  }
};

module.exports = swaggerDocument;
