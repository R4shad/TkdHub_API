// models/ageInterval.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class AgeInterval extends Model {
  public ageIntervalName!: string;
  public minAge!: number | null;
  public maxAge!: number | null;
}

AgeInterval.init(
  {
    ageIntervalName: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
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
