import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";

class ChampionshipCategory extends Model {
  public championshipId!: number;
  public categoryId!: number;
  public categoryName!: string;
  public gradeMin!: string | null;
  public gradeMax!: string | null;
  public numberOfCompetitors!: number;
}

ChampionshipCategory.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    gradeMin: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    gradeMax: {
      type: DataTypes.STRING(25),
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
    tableName: "ChampionshipCategory",
    timestamps: false,
  }
);

ChampionshipCategory.belongsTo(Championship, {
  foreignKey: "championshipId",
});

export default ChampionshipCategory;
