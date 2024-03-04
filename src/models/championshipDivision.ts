import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import DefaultDivision from "./defaultDivision";
import ChampionshipAgeInterval from "./championshipAgeInterval";

class ChampionshipDivision extends Model {
  public championshipId!: number;
  public divisionId!: number;
  public divisionName!: string;
  public ageIntervalId!: number;
  public minWeight!: number | null;
  public maxWeight!: number | null;
  public gender!: string | null;
  public grouping!: string | null;
  public numberOfCompetitors!: number;
}

ChampionshipDivision.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    divisionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    divisionName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ageIntervalId: {
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
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    numberOfCompetitors: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipDivision",
    timestamps: false,
  }
);

ChampionshipDivision.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipDivision.belongsTo(ChampionshipAgeInterval, {
  foreignKey: "ageIntervalId",
});

export default ChampionshipDivision;
