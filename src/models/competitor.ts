import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import ChampionshipCategory from "./championshipCategory";
import ChampionshipDivision from "./championshipDivision";

class Competitor extends Model {
  public competitorId!: number;
  public participantCi!: number;
  public championshipId!: number;
  public divisionName!: string;
  public categoryName!: string;
}

Competitor.init(
  {
    competitorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    participantCi: {
      type: DataTypes.INTEGER.UNSIGNED,
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

// Definir las relaciones con las otras tablas
Competitor.belongsTo(Participant, {
  foreignKey: "participantCi",
});

// Relación con la tabla ChampionshipCategory
Competitor.belongsTo(ChampionshipCategory, {
  foreignKey: "championshipId",
});

// Relación con la tabla ChampionshipDivision
Competitor.belongsTo(ChampionshipDivision, {
  foreignKey: "championshipId",
});

export default Competitor;
