// models/club.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Club extends Model {
  public clubCode!: string;
  public name!: string | null;
}

Club.init(
  {
    clubCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Club",
  }
);

export default Club;
