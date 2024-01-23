// models/category.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Category extends Model {
  public categoryName!: string;
  public gradeMin!: string | null;
  public gradeMax!: string | null;
}

Category.init(
  {
    categoryName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
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
    tableName: "Category",
  }
);

export default Category;
