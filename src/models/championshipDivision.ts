// models/championshipDivision.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Division from "./division";

class ChampionshipDivision extends Model {
  public championshipId!: number;
  public divisionName!: string;
  public numberOfCompetitors!: number;
}

ChampionshipDivision.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    numberOfCompetitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipDivision",
  }
);

// Definir las relaciones con las otras tablas
ChampionshipDivision.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipDivision.belongsTo(Division, {
  foreignKey: "divisionName",
});

export default ChampionshipDivision;
