import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Club from "./club";

class Participant extends Model {
  public id!: string;
  public clubCode!: string;
  public lastNames!: string | null;
  public firstNames!: string | null;
  public age!: number | null;
  public weight!: number | null;
  public grade!: string | null;
  public gender!: string | null;
}

Participant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    clubCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    lastNames: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    firstNames: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Participant",
    timestamps: false,
  }
);

Participant.belongsTo(Club, {
  foreignKey: "clubCode",
});

export default Participant;
