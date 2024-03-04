import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import AgeInterval from "./defaultAgeInterval";

class Division extends Model {
  public divisionName!: string;
  public ageIntervalId!: number;
  public minWeight!: number | null;
  public maxWeight!: number | null;
  public gender!: string | null;
  public grouping!: string | null;
}

Division.init(
  {
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalId: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    grouping: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Division",
    timestamps: false,
  }
);

Division.belongsTo(AgeInterval, {
  foreignKey: "ageIntervalId",
});

export default Division;
