// models/championshipResponsible.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Responsible from "./responsible";

class ChampionshipResponsible extends Model {
  public championshipId!: number;
  public responsibleCi!: number;
  public password!: string;
}

ChampionshipResponsible.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    responsibleCi: {
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
    tableName: "ChampionshipResponsible",
  }
);

// Definir las relaciones con las otras tablas
ChampionshipResponsible.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipResponsible.belongsTo(Responsible, {
  foreignKey: "responsibleCi",
});

export default ChampionshipResponsible;
