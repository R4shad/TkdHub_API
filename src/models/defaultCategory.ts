import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class DefaultCategory extends Model {
  public id!: number; // Agregar la declaración del campo id
  public categoryName!: string;
  public gradeMin!: string | null;
  public gradeMax!: string | null;
}

DefaultCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    gradeMin: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    gradeMax: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "DefaultCategory",
    timestamps: false,
  }
);

export default DefaultCategory;
