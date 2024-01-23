"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.1.0",
        info: { title: "TKD API", version: "1.0.0" },
    },
    apis: [
        "src/routes/campeonatos.routes.ts",
        "src/routes/responsables.routes.ts",
        "src/routes/inscritos.routes.ts",
        "src/routes/categorias.routes.ts",
        "src/routes/clubes.routes.ts",
        "src/routes/entrenadores.routes.ts",
        "src/routes/divisiones.routes.ts",
        "src/routes/pesos.routes.ts",
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app, port) => {
    app.use("/swagger/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get("/swagger/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};
exports.swaggerDocs = swaggerDocs;
