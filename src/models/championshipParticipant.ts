// models/championshipParticipant.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import Championship from "./championship";

class ChampionshipParticipant extends Model {
  public participantCi!: number;
  public championshipId!: number;
  public verified!: boolean;
}

ChampionshipParticipant.init(
  {
    participantCi: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "ChampionshipParticipant",
  }
);

// Definir las relaciones con las otras tablas
ChampionshipParticipant.belongsTo(Participant, {
  foreignKey: "participantCi",
});

ChampionshipParticipant.belongsTo(Championship, {
  foreignKey: "championshipId",
});

export default ChampionshipParticipant;
