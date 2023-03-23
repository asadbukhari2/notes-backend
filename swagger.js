const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Notes And User app APIs",
      version: "1.0.0",
      description: "API documentation for my NOTES APP",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
      {
        url: "https://notes-backend-yvu6.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-API-KEY",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js", "./server.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
