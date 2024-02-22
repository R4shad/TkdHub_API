import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Club from "./club";

class ChampionshipClub extends Model {
  public championshipId!: number;
  public clubCode!: string;
}

ChampionshipClub.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    clubCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipClub",
  }
);

ChampionshipClub.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipClub.belongsTo(Club, {
  foreignKey: "clubCode",
});

export default ChampionshipClub;
