"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/championshipCategory.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const championship_1 = __importDefault(require("./championship"));
const category_1 = __importDefault(require("./category"));
class ChampionshipCategory extends sequelize_1.Model {
}
ChampionshipCategory.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING(25),
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
    tableName: "ChampionshipCategory",
});
// Definir las relaciones con las otras tablas
ChampionshipCategory.belongsTo(championship_1.default, {
    foreignKey: "championshipId",
});
ChampionshipCategory.belongsTo(category_1.default, {
    foreignKey: "categoryName",
});
exports.default = ChampionshipCategory;
