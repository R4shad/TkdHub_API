import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Coach from "./coach";

class ChampionshipCoach extends Model {
  public championshipId!: number;
  public coachCi!: number;
  public password!: string;
}

ChampionshipCoach.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    coachCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipCoach",
  }
);

ChampionshipCoach.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipCoach.belongsTo(Coach, {
  foreignKey: "coachCi",
});

export default ChampionshipCoach;
