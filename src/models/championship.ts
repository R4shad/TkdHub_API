import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Championship extends Model {
  public championshipId!: number;
  public championshipName!: string | null;
  public organizer!: string | null;
  public organizerCi!: number | null;
  public organizerPassword!: string | null;
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
    championshipName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    organizer: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    organizerCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    organizerPassword: {
      type: DataTypes.STRING,
      allowNull: false,
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
