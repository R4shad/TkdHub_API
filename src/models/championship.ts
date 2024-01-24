import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Championship extends Model {
  public championshipId!: number;
  public name!: string | null;
  public organizer!: string | null;
  public password!: string | null;
  public active!: boolean;
  public championshipDate!: Date | null;
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
    },
    organizer: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    championshipDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Championship",
  }
);

export default Championship;
