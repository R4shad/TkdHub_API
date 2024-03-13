import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Division from "./defaultDivision";
import Category from "./defaultCategory";

class Bracket extends Model {
  public bracketId!: number;
  public divisionId!: number;
  public categoryId!: number;
  public championshipId!: number;
  public scoreable!: boolean; // Nuevo campo scoreable
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    scoreable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Bracket",
    timestamps: false,
  }
);

Bracket.belongsTo(Division, {
  foreignKey: "divisionId",
});

Bracket.belongsTo(Category, {
  foreignKey: "categoryId",
});

export default Bracket;
