"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
// import { sequelize } from './src/components/database.config.js'
// import { bot } from './src/components/bot.js'
// import User from './src/models/rate.js'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await sequelize.authenticate();
            // await sequelize.sync();
            console.log('DB Connection has been established successfully.');
            app.listen(process.env.PORT, () => {
                console.log(`Bot server started at port: ${process.env.PORT}`);
            });
            // startBot();
        }
        catch (error) {
            console.log(error);
            console.log('DB not connected');
        }
    });
}
startApp();
