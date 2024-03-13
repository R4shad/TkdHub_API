import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

enum ChampionshipStage {
  Etapa1 = "InitialConfiguration",
  Etapa2 = "Registrations",
  Etapa3 = "Weigh-in",
  Etapa4 = "BracketDraw",
  Etapa5 = "CombatRecord",
  Etapa6 = "End",
}

class Championship extends Model {
  public championshipId!: number;
  public championshipName!: string | null;
  public organizerId!: number | null;
  public championshipDate!: Date | null;
  public stage!: ChampionshipStage | null;
  public goldPoints!: number | null;
  public silverPoints!: number | null;
  public bronzePoints!: number | null;
}

Championship.init(
  {
    championshipId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    championshipName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    organizerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    championshipDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stage: {
      type: DataTypes.ENUM(
        ...Object.values(ChampionshipStage).map((value) => value.toString())
      ),
      allowNull: false,
    },
    goldPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    silverPoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bronzePoints: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Championship",
    timestamps: false,
  }
);

export default Championship;
