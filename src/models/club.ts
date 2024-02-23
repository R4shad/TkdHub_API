import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Club extends Model {
  public clubCode!: string;
  public name!: string | null;
  public coachCi!: number;
  public coachName!: string;
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
    coachCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    coachName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Club",
  }
);
export default Club;
