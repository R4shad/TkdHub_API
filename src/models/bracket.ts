import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Division from "./division";
import Category from "./category";

class Bracket extends Model {
  public bracketId!: number;
  public divisionName!: string;
  public categoryName!: string;
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
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(50),
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
  }
);

Bracket.belongsTo(Division, {
  foreignKey: "divisionName",
});

Bracket.belongsTo(Category, {
  foreignKey: "categoryName",
});

export default Bracket;
