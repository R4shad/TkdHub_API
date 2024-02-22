import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Club from "./club";

class Coach extends Model {
  public coachCi!: number;
  public name!: string;
  public clubCode!: string;
}

Coach.init(
  {
    coachCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    clubCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Coach",
  }
);

Coach.belongsTo(Club, {
  foreignKey: "clubCode",
});

export default Coach;
