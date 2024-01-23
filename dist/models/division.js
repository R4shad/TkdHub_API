"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/division.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const ageInterval_1 = __importDefault(require("./ageInterval"));
class Division extends sequelize_1.Model {
}
Division.init({
    divisionName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    ageIntervalName: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    minWeight: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    maxWeight: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Division",
});
// Definir la relación con la tabla AgeInterval
Division.belongsTo(ageInterval_1.default, {
    foreignKey: "ageIntervalName",
});
exports.default = Division;
