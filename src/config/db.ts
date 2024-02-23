// config/db.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "megaman123",
  database: "tkdHub_v4",
});

export { sequelize };
