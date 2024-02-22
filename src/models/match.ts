import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Bracket from "./bracket";
import Competitor from "./competitor";

class Match extends Model {
  public matchId!: number;
  public bracketId!: number;
  public redParticipantId!: string;
  public blueParticipantId!: string;
  public round!: string;
  public redRounds!: number | null;
  public blueRounds!: number | null;
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
    redParticipantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    blueParticipantId: {
      type: DataTypes.UUID,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: "Match",
  }
);

Match.belongsTo(Bracket, {
  foreignKey: "bracketId",
});

Match.belongsTo(Competitor, {
  foreignKey: "redParticipantCi",
  as: "redCompetitor",
});

Match.belongsTo(Competitor, {
  foreignKey: "blueParticipantCi",
  as: "blueCompetitor",
});

export default Match;
