import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Club extends Model {
  public clubCode!: string;
  public name!: string | null;
  public coachName!: string;
  public email!: string;
  public password!: string;
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
    coachName: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    tableName: "Club",
    timestamps: false,
  }
);

export default Club;
