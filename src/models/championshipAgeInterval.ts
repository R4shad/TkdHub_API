import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";

class ChampionshipAgeInterval extends Model {
  public id!: number;
  public ageIntervalName!: string;
  public minAge!: number | null;
  public maxAge!: number | null;
  public championshipId!: number;
}

ChampionshipAgeInterval.init(
  {
    ageIntervalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ageIntervalName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    minAge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    maxAge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipAgeInterval",
    timestamps: false,
  }
);

ChampionshipAgeInterval.belongsTo(Championship, {
  foreignKey: "championshipId",
});

export default ChampionshipAgeInterval;
