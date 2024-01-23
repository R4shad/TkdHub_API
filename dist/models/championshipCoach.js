"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipCoach.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const championship_1 = __importDefault(require("./championship"));
const coach_1 = __importDefault(require("./coach"));
class ChampionshipCoach extends sequelize_1.Model {
}
ChampionshipCoach.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    coachCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "ChampionshipCoach",
});
// Definir las relaciones con las otras tablas
ChampionshipCoach.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
ChampionshipCoach.belongsTo(coach_1.default, {
    foreignKey: "coachCi",
});
exports.default = ChampionshipCoach;
