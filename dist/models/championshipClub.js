"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipClub.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const championship_1 = __importDefault(require("./championship"));
const club_1 = __importDefault(require("./club"));
class ChampionshipClub extends sequelize_1.Model {
}
ChampionshipClub.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    clubCode: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "ChampionshipClub",
});
// Definir las relaciones con las otras tablas
ChampionshipClub.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
ChampionshipClub.belongsTo(club_1.default, {
    foreignKey: "clubCode",
});
exports.default = ChampionshipClub;
