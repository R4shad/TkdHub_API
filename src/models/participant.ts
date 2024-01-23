// models/participant.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Club from "./club";

class Participant extends Model {
  public participantCi!: number;
  public clubCode!: string;
  public lastNames!: string | null;
  public firstNames!: string | null;
  public age!: number | null;
  public weight!: number | null;
  public grade!: string | null;
  public gender!: string | null;
  public verified!: boolean;
}

Participant.init(
  {
    participantCi: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "Participant",
  }
);

// Definir la relación con la tabla Club
Participant.belongsTo(Club, {
  foreignKey: "clubCode",
});

export default Participant;
