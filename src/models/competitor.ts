import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import ChampionshipCategory from "./championshipCategory";
import ChampionshipDivision from "./championshipDivision";

class Competitor extends Model {
  public competitorId!: string;
  public participantId!: string;
  public championshipId!: number;
  public divisionName!: string;
  public categoryName!: string;
}

Competitor.init(
  {
    competitorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    participantId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: "uniqueParticipantPerChampionship",
    },
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: "uniqueParticipantPerChampionship",
    },
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Competidor",
  }
);

Competitor.belongsTo(Participant, {
  foreignKey: "participantId",
});

Competitor.belongsTo(ChampionshipCategory, {
  foreignKey: "championshipId",
});

Competitor.belongsTo(ChampionshipDivision, {
  foreignKey: "championshipId",
});

export default Competitor;
