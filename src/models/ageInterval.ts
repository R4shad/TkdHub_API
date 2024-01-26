// models/ageInterval.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class AgeInterval extends Model {
  public id!: number;
  public ageIntervalName!: string;
  public minAge!: number | null;
  public maxAge!: number | null;
}

AgeInterval.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    minAge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    maxAge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "AgeInterval",
  }
);

export default AgeInterval;
