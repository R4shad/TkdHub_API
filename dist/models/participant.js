"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/participant.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const club_1 = __importDefault(require("./club"));
class Participant extends sequelize_1.Model {
}
Participant.init({
    participantCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    clubCode: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
    lastNames: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    firstNames: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    grade: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Participant",
});
// Definir la relación con la tabla Club
Participant.belongsTo(club_1.default, {
    foreignKey: "clubCode",
});
exports.default = Participant;
