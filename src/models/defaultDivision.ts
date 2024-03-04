import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import DefaultAgeInterval from "./defaultAgeInterval";

class DefaultDivision extends Model {
  public id!: number; // Agregar la declaración del campo id
  public divisionName!: string;
  public ageIntervalId!: number;
  public minWeight!: number | null;
  public maxWeight!: number | null;
  public gender!: string | null;
  public grouping!: string | null;
}

DefaultDivision.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    tableName: "DefaultDivision",
    timestamps: false,
  }
);

DefaultDivision.belongsTo(DefaultAgeInterval, {
  foreignKey: "ageIntervalId",
});

export default DefaultDivision;
