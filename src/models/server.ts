import express from "express";
import morgan from "morgan";
import cors from "cors";
import { swaggerDocs } from "../V1/swagger";

import Championship from "./championship";
import Responsible from "./responsible";
import ChampionshipResponsible from "./championshipResponsible";
import Club from "./club";
import ChampionshipClub from "./championshipClub";
import Coach from "./coach";
import ChampionshipCoach from "./championshipCoach";
import Participant from "./participant";
import ChampionshipParticipant from "./championshipParticipant";
import Category from "./category";
import ChampionshipCategory from "./championshipCategory";
import Division from "./division";
import AgeInterval from "./ageInterval";
import ChampionshipDivision from "./championshipDivision";
import Competitor from "./competitor";
import Bracket from "./bracket";
import Match from "./match";

import routesChampionship from "../routes/championship.routes";
import routesResponsibles from "../routes/responsible.routes";
import routesClub from "../routes/club.routes";

class Server {
  app: express.Application;
  port: string | number;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.port = process.env.PORT || "3000";
    this.configureServer();
    this.startServer();
    this.routes();
    this.notFound();
    this.dbConnect();
  }

  private configureServer() {
    this.launchSwagger();
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private routes() {
    this.app.use("/api/championship", routesChampionship);
    this.app.use("/api/responsible", routesResponsibles);
    this.app.use("/api/club", routesClub);
  }

  private launchSwagger() {
    swaggerDocs(this.app, this.port);
  }

  private startServer() {
    this.app.listen(this.port, () => {
      console.log("Server running on port " + this.port + "/api");
    });
  }

  private notFound() {
    // Middleware para manejar rutas no encontradas
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Endpoint not found",
      });
    });
  }

  async dbConnect() {
    try {
      await Championship.sync({ alter: true });
      await Responsible.sync();
      await ChampionshipResponsible.sync();
      await Club.sync();
      await ChampionshipClub.sync();
      await Coach.sync();
      await ChampionshipCoach.sync();
      await Participant.sync();
      await ChampionshipParticipant.sync();
      await Category.sync();
      await ChampionshipCategory.sync();
      await AgeInterval.sync({});
      await Division.sync({});

      await ChampionshipDivision.sync();
      await Competitor.sync();
      await Bracket.sync();
      await Match.sync();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
