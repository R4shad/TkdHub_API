"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// config/db.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "megaman123",
    database: "TkdHubS",
});
exports.sequelize = sequelize;
