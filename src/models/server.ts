import express from "express";
import morgan from "morgan";
import cors from "cors";
import { swaggerDocs } from "../V1/swagger";

import Championship from "./championship";
import Responsible from "./responsible";
import ChampionshipResponsible from "./championshipResponsible";
import Club from "./club";
import ChampionshipClub from "./championshipClub";
import participant from "./participant";
import ChampionshipParticipant from "./championshipParticipant";
import ChampionshipCategory from "./championshipCategory";
import DefaultAgeInterval from "./defaultAgeInterval";

import ChampionshipDivision from "./championshipDivision";
import Competitor from "./competitor";
import Bracket from "./bracket";
import Match from "./match";

import routesChampionship from "../routes/championship.routes";
import routesResponsibles from "../routes/responsible.routes";
import routesClub from "../routes/club.routes";

import routesDivision from "../routes/division.routes";
import routesCompetitor from "../routes/competitor.routes";
import routesAgeInterval from "../routes/ageInterval.routes";

import routesCategory from "../routes/category.routes";
import routesParticipant from "../routes/participant.routes";
import routesBracket from "../routes/bracket.routes";
import routesMatch from "../routes/match.routes";
import ChampionshipAgeInterval from "./championshipAgeInterval";
import DefaultCategory from "./defaultCategory";
import DefaultDivision from "./defaultDivision";
import Organizer from "./organizer";

import validateToken from "./validateToken";
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
    this.app.use("/api/championship", validateToken, routesChampionship);
    this.app.use("/api/participant", validateToken, routesParticipant);
    this.app.use("/api/responsible", validateToken, routesResponsibles);
    this.app.use("/api/club", validateToken, routesClub);
    this.app.use("/api/ageInterval", validateToken, routesAgeInterval);
    this.app.use("/api/division", validateToken, routesDivision);
    this.app.use("/api/category", validateToken, routesCategory);
    this.app.use("/api/competitor", validateToken, routesCompetitor);
    this.app.use("/api/bracket", validateToken, routesBracket);
    this.app.use("/api/match", validateToken, routesMatch);
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
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Endpoint not found",
      });
    });
  }

  async dbConnect() {
    try {
      await Organizer.sync();
      await Championship.sync({});
      await Responsible.sync();
      await ChampionshipResponsible.sync();
      await Club.sync();
      await ChampionshipClub.sync();
      await participant.sync();
      await ChampionshipParticipant.sync();

      await DefaultAgeInterval.sync();
      await DefaultCategory.sync();
      await DefaultDivision.sync();
      await ChampionshipAgeInterval.sync();
      await ChampionshipCategory.sync();
      await ChampionshipDivision.sync();
      await Competitor.sync({});
      await Bracket.sync();
      await Match.sync();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

export default Server;
