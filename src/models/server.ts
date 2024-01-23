import express from "express";
import morgan from "morgan";
import { swaggerDocs } from "../V1/swagger";

import routesChampionship from "../routes/championship.routes";

class Server {
  app: express.Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.configureRoutes();
    this.configureServer();
    this.startServer();
  }

  private configureServer() {
    this.launchSwagger();
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    // Middleware para manejar rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Endpoint not found",
      });
    });
  }

  private configureRoutes() {
    this.app.use("/api/Championship", routesChampionship);
  }

  private launchSwagger() {
    swaggerDocs(this.app, this.port);
  }

  private startServer() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port + "/api");
    });
  }
}

export default Server;
