// models/division.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import AgeInterval from "./ageInterval";

class Division extends Model {
  public divisionName!: string;
  public ageIntervalName!: string;
  public minWeight!: number | null;
  public maxWeight!: number | null;
  public gender!: string | null;
}

Division.init(
  {
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    maxWeight: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Division",
  }
);

// Definir la relación con la tabla AgeInterval
Division.belongsTo(AgeInterval, {
  foreignKey: "ageIntervalName",
});

export default Division;
