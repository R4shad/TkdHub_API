// models/championship.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Ajusta la ruta según tu estructura

class Championship extends Model {
  public championshipId!: number;
  public name!: string | null;
  public organizer!: string | null;
  public active!: boolean;
}

Championship.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: true,
      unique: true,
    },
    organizer: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "Championship", // Ajusta el nombre de la tabla según tu configuración
  }
);

export default Championship;
