// config/db.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "megaman123",
  database: "tkdHub_f1",
});

export { sequelize };
