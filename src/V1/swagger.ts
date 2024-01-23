import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: { title: "TKD API", version: "1.0.0" },
  },
  apis: [
    "src/routes/campeonatos.routes.ts",
    "src/routes/responsables.routes.ts",
    "src/routes/inscritos.routes.ts",
    "src/routes/categorias.routes.ts",
    "src/routes/clubes.routes.ts",
    "src/routes/entrenadores.routes.ts",
    "src/routes/divisiones.routes.ts",
    "src/routes/pesos.routes.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: express.Application, port: string | number) => {
  app.use("/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/swagger/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export { swaggerDocs };
