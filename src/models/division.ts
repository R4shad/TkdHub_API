// models/division.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import AgeInterval from "./ageInterval";

class Division extends Model {
  public divisionName!: string;
  public ageIntervalId!: number; // Cambiado a número
  public minWeight!: number | null;
  public maxWeight!: number | null;
  public gender!: string | null;
  public grouping!: string | null; // Nuevo campo para la agrupación

  // ... otras propiedades y métodos
}

Division.init(
  {
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalId: {
      // Cambiado a número
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
      type: DataTypes.STRING(50), // Puedes ajustar la longitud según sea necesario
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
  foreignKey: "ageIntervalId",
});

export default Division;
