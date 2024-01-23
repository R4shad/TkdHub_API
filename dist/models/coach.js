"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/coach.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
const club_1 = __importDefault(require("./club"));
class Coach extends sequelize_1.Model {
}
Coach.init({
    coachCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    clubCode: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Coach",
});
// Definir la relación con la tabla Club
Coach.belongsTo(club_1.default, {
    foreignKey: "clubCode",
});
exports.default = Coach;
