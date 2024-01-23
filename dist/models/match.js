"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/match.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const bracket_1 = __importDefault(require("./bracket"));
const competitor_1 = __importDefault(require("./competitor"));
class Match extends sequelize_1.Model {
}
Match.init({
    matchId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    bracketId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    redParticipantCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    blueParticipantCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    round: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: false,
    },
    redRounds: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
    },
    blueRounds: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Match",
});
// Definir las relaciones con las otras tablas
Match.belongsTo(bracket_1.default, {
    foreignKey: "bracketId",
});
Match.belongsTo(competitor_1.default, {
    foreignKey: "redParticipantCi",
    as: "redCompetitor",
});
Match.belongsTo(competitor_1.default, {
    foreignKey: "blueParticipantCi",
    as: "blueCompetitor",
});
exports.default = Match;
