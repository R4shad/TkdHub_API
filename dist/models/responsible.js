"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/responsible.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Responsible extends sequelize_1.Model {
}
Responsible.init({
    responsibleCi: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Responsible",
});
exports.default = Responsible;
