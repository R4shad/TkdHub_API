import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import ChampionshipParticipant from "./championshipParticipant";

class Responsible extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}

Responsible.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Responsible",
    timestamps: false,
  }
);

export default Responsible;
