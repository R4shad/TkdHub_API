"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/ageInterval.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class AgeInterval extends sequelize_1.Model {
}
AgeInterval.init({
    ageIntervalName: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        primaryKey: true,
    },
    minAge: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    maxAge: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "AgeInterval",
});
exports.default = AgeInterval;
