"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/club.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Club extends sequelize_1.Model {
}
Club.init({
    clubCode: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Club",
});
exports.default = Club;
