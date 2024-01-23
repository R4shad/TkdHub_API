"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/championship.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db"); // Ajusta la ruta según tu estructura
class Championship extends sequelize_1.Model {
}
Championship.init({
    championshipId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: true,
        unique: true,
    },
    organizer: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Championship", // Ajusta el nombre de la tabla según tu configuración
});
exports.default = Championship;
