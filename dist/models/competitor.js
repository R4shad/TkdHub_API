"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/competitor.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const participant_1 = __importDefault(require("./participant"));
const division_1 = __importDefault(require("./division"));
const category_1 = __importDefault(require("./category"));
class Competitor extends sequelize_1.Model {
}
Competitor.init({
    participantCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
}, {
    sequelize: db_1.sequelize,
    tableName: "Competitor",
});
// Definir las relaciones con las otras tablas
Competitor.belongsTo(participant_1.default, {
    foreignKey: "participantCi",
});
Competitor.belongsTo(division_1.default, {
    foreignKey: "divisionName",
});
Competitor.belongsTo(category_1.default, {
    foreignKey: "categoryName",
});
exports.default = Competitor;
