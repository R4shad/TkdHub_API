import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.1.0",
    info: { title: "TKD API", version: "1.0.0" },
  },
  apis: [
    "src/routes/championship.routes.ts",
    "src/routes/participant.routes.ts",
    "src/routes/responsible.routes.ts",
    "src/routes/club.routes.ts",
    "src/routes/coach.routes.ts",
    "src/routes/ageInterval.routes.ts",
    "src/routes/division.routes.ts",
    "src/routes/category.routes.ts",
    "src/routes/competitor.routes.ts",
    "src/routes/championshipAgeInterval.routes.ts",
    "src/routes/championshipDivision.routes.ts",
    "src/routes/championshipCategory.routes.ts",
    "src/routes/bracket.routes.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: express.Application, port: string | number) => {
  app.use("/api/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/swagger/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export { swaggerDocs };
