import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import Participant from "./participant";
import Championship from "./championship";

class ChampionshipParticipant extends Model {
  public participantId!: string;
  public championshipId!: number;
  public verified!: boolean;
}

ChampionshipParticipant.init(
  {
    participantId: {
      type: DataTypes.UUID,
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

ChampionshipParticipant.belongsTo(Participant, {
  foreignKey: "participantId",
});

ChampionshipParticipant.belongsTo(Championship, {
  foreignKey: "championshipId",
});

export default ChampionshipParticipant;
