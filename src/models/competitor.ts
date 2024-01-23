// models/competitor.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import Division from "./division";
import Category from "./category";

class Competitor extends Model {
  public participantCi!: number;
  public divisionName!: string;
  public categoryName!: string;
}

Competitor.init(
  {
    participantCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
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
    tableName: "Competitor",
  }
);

// Definir las relaciones con las otras tablas
Competitor.belongsTo(Participant, {
  foreignKey: "participantCi",
});

Competitor.belongsTo(Division, {
  foreignKey: "divisionName",
});

Competitor.belongsTo(Category, {
  foreignKey: "categoryName",
});

export default Competitor;
