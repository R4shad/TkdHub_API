import express from "express";
import morgan from "morgan";

//import { swaggerDocs } from "../v1/swagger";

class Server {
  app: express.Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.listen();
    console.log(process.env.PORT);
  }

  listen() {
    this.app.listen(this.port, () => {
      //swaggerDocs(this.app, this.port);
      this.app.use(express.json());
      this.app.use(morgan("dev"));

      this.app.use((req, res, next) => {
        res.status(404).json({
          message: "endpoint not found",
        });
      });
    });
    console.log("Server running on port " + this.port + "/api");
  }
}

export default Server;
