"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipParticipant.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const participant_1 = __importDefault(require("./participant"));
const championship_1 = __importDefault(require("./championship"));
class ChampionshipParticipant extends sequelize_1.Model {
}
ChampionshipParticipant.init({
    participantCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "ChampionshipParticipant",
});
// Definir las relaciones con las otras tablas
ChampionshipParticipant.belongsTo(participant_1.default, {
    foreignKey: "participantCi",
});
ChampionshipParticipant.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
exports.default = ChampionshipParticipant;
