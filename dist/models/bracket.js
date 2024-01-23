"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/bracket.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const division_1 = __importDefault(require("./division"));
const category_1 = __importDefault(require("./category"));
class Bracket extends sequelize_1.Model {
}
Bracket.init({
    bracketId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    divisionName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    categoryName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Bracket",
});
// Definir las relaciones con las otras tablas
Bracket.belongsTo(division_1.default, {
    foreignKey: "divisionName",
});
Bracket.belongsTo(category_1.default, {
    foreignKey: "categoryName",
});
exports.default = Bracket;
