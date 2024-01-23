// models/responsible.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Responsible extends Model {
  public responsibleCi!: number;
  public name!: string;
}

Responsible.init(
  {
    responsibleCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Responsible",
  }
);

export default Responsible;
