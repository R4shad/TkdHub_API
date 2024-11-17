import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import participant from "./participant";
import ChampionshipCategory from "./championshipCategory";
import ChampionshipDivision from "./championshipDivision";

class Competitor extends Model {
  public competitorId!: string;
  public participantId!: string;
  public championshipId!: number;
  public divisionId!: number; // Cambio de divisionName a divisionId
  public categoryId!: number; // Cambio de categoryName a categoryId
  public notParticipate!: boolean; // Nuevo campo agregado
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
    notParticipate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Valor por defecto
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Competidor",
    timestamps: false,
  }
);

Competitor.belongsTo(participant, {
  foreignKey: "participantId",
});
Competitor.belongsTo(ChampionshipCategory, {
  foreignKey: "categoryId", // Cambio de championshipId a categoryId
});
Competitor.belongsTo(ChampionshipDivision, {
  foreignKey: "divisionId", // Cambio de championshipId a divisionId
});

export default Competitor;
