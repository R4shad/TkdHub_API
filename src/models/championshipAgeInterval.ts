// models/championshipAgeInterval.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import AgeInterval from "./ageInterval";

class ChampionshipAgeInterval extends Model {
  public championshipId!: number;
  public ageIntervalId!: number;
}

ChampionshipAgeInterval.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipAgeInterval",
  }
);

// Definir las relaciones con las otras tablas
ChampionshipAgeInterval.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipAgeInterval.belongsTo(AgeInterval, {
  foreignKey: "ageIntervalId",
});

export default ChampionshipAgeInterval;
