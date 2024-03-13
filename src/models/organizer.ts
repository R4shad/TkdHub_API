import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";

class Organizer extends Model {
  public organizerId!: number;
  public email!: string;
  public password!: string;
}

Organizer.init(
  {
    organizerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Organizer",
    timestamps: false,
  }
);

Organizer.hasOne(Championship, {
  foreignKey: "organizerId",
});

export default Organizer;
