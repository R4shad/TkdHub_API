import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import ChampionshipCategory from "./championshipCategory";
import ChampionshipDivision from "./championshipDivision";

class Competitor extends Model {
  public competidorId!: number;
  public inscritoCi!: number;
  public campeonatoId!: number;
  public nombreDivision!: string;
  public nombreCategoria!: string;
}

Competitor.init(
  {
    competidorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    inscritoCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    campeonatoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    nombreDivision: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombreCategoria: {
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
  foreignKey: "inscritoCi",
});

// Relación con la tabla ChampionshipCategory
Competitor.belongsTo(ChampionshipCategory, {
  foreignKey: "campeonatoId",
});

// Relación con la tabla ChampionshipDivision
Competitor.belongsTo(ChampionshipDivision, {
  foreignKey: "campeonatoId",
});

export default Competitor;
