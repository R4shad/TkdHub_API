"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//import { swaggerDocs } from "../v1/swagger";
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.listen();
        console.log(process.env.PORT);
    }
    listen() {
        this.app.listen(this.port, () => {
            //swaggerDocs(this.app, this.port);
            this.app.use(express_1.default.json());
            this.app.use((0, morgan_1.default)("dev"));
            this.app.use((req, res, next) => {
                res.status(404).json({
                    message: "endpoint not found",
                });
            });
        });
        console.log("Server running on port " + this.port + "/api");
    }
}
exports.default = Server;
