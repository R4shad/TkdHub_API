import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Championship from "./championship";
import Responsible from "./responsible";

class ChampionshipResponsible extends Model {
  public championshipId!: number;
  public responsibleId!: string; // Cambiado de number a string para usar UUID
  public password!: string;
}

ChampionshipResponsible.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    responsibleId: {
      type: DataTypes.UUID, // Cambiado el tipo de dato a UUID
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
    timestamps: false,
  }
);

ChampionshipResponsible.belongsTo(Championship, {
  foreignKey: "championshipId",
});

ChampionshipResponsible.belongsTo(Responsible, {
  foreignKey: "responsibleId",
});

export default ChampionshipResponsible;
