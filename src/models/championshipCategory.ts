// models/championshipCategory.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Category from "./category";

class ChampionshipCategory extends Model {
  public championshipId!: number;
  public categoryName!: string;
  public numberOfCompetitors!: number;
}

ChampionshipCategory.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING(25),
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
    tableName: "ChampionshipCategory",
  }
);

// Definir las relaciones con las otras tablas
ChampionshipCategory.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipCategory.belongsTo(Category, {
  foreignKey: "categoryName",
});

export default ChampionshipCategory;
