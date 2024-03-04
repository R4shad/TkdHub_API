import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import ChampionshipCategory from "./championshipCategory";
import ChampionshipDivision from "./championshipDivision";

class Competitor extends Model {
  public competitorId!: string;
  public participantId!: string;
  public championshipId!: number;
  public divisionId!: number; // Cambio de divisionName a divisionId
  public categoryId!: number; // Cambio de categoryName a categoryId
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
    divisionId: {
      // Cambio de divisionName a divisionId
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    categoryId: {
      // Cambio de categoryName a categoryId
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Competidor",
    timestamps: false,
  }
);

Competitor.belongsTo(Participant, {
  foreignKey: "participantId",
});

Competitor.belongsTo(ChampionshipCategory, {
  foreignKey: "categoryId", // Cambio de championshipId a categoryId
});

Competitor.belongsTo(ChampionshipDivision, {
  foreignKey: "divisionId", // Cambio de championshipId a divisionId
});

export default Competitor;
