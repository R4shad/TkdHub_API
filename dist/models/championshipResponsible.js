"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipResponsible.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const championship_1 = __importDefault(require("./championship"));
const responsible_1 = __importDefault(require("./responsible"));
class ChampionshipResponsible extends sequelize_1.Model {
}
ChampionshipResponsible.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    responsibleCi: {
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
    tableName: "ChampionshipResponsible",
});
// Definir las relaciones con las otras tablas
ChampionshipResponsible.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
ChampionshipResponsible.belongsTo(responsible_1.default, {
    foreignKey: "responsibleCi",
});
exports.default = ChampionshipResponsible;
