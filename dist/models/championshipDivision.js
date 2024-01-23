"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipDivision.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const championship_1 = __importDefault(require("./championship"));
const division_1 = __importDefault(require("./division"));
class ChampionshipDivision extends sequelize_1.Model {
}
ChampionshipDivision.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    divisionName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    numberOfCompetitors: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "ChampionshipDivision",
});
// Definir las relaciones con las otras tablas
ChampionshipDivision.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
ChampionshipDivision.belongsTo(division_1.default, {
    foreignKey: "divisionName",
});
exports.default = ChampionshipDivision;
