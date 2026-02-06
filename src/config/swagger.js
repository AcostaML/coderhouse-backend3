import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export function setupSwagger(app) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "coderhouse-backend3 API",
        version: "1.0.0"
      }
    },
    apis: ["./src/docs/users.swagger.js"]
  };

  const specs = swaggerJSDoc(options);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
}
