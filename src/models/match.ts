import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Bracket from "./bracket";
import Competitor from "./competitor";
import Championship from "./championship";

class Match extends Model {
  public matchId!: number;
  public bracketId!: number;
  public redCompetitorId!: string;
  public blueCompetitorId!: string;
  public round!: string;
  public redRounds!: number | null;
  public blueRounds!: number | null;
  public championshipId!: number;
  public matchNumber!: number | null;
}

Match.init(
  {
    matchId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bracketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    redCompetitorId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    blueCompetitorId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    round: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    redRounds: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    blueRounds: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    matchNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Match",
    timestamps: false,
  }
);

Match.belongsTo(Bracket, {
  foreignKey: "bracketId",
});

Match.belongsTo(Competitor, {
  foreignKey: "redCompetitorId",
  as: "redCompetitor",
});

Match.belongsTo(Competitor, {
  foreignKey: "blueCompetitorId",
  as: "blueCompetitor",
});

Match.belongsTo(Championship, {
  foreignKey: "championshipId",
});

export default Match;
