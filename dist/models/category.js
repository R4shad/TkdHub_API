"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/category.ts
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Category extends sequelize_1.Model {
}
Category.init({
    categoryName: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
    },
    gradeMin: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    gradeMax: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "Category",
});
exports.default = Category;
