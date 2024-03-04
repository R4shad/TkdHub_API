import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Division from "./defaultDivision";
import Category from "./defaultCategory";

class Bracket extends Model {
  public bracketId!: number;
  public divisionId!: number; // Cambio de divisionName a divisionId
  public categoryId!: number; // Cambio de categoryName a categoryId
  public championshipId!: number;
}

Bracket.init(
  {
    bracketId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Bracket",
    timestamps: false,
  }
);

Bracket.belongsTo(Division, {
  foreignKey: "divisionId", // Cambio de divisionName a divisionId
});

Bracket.belongsTo(Category, {
  foreignKey: "categoryId", // Cambio de categoryName a categoryId
});

export default Bracket;
