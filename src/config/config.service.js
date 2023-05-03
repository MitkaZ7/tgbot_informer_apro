"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
var dotenv_1 = require("dotenv");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        var _a = (0, dotenv_1.config)(), error = _a.error, parsed = _a.parsed;
        if (error) {
            throw new Error("Не найден файл .env");
        }
        if (!parsed) {
            throw new Error("пустой файл .env");
        }
        this.config = parsed;
    }
    ConfigService.prototype.get = function (key) {
        var res = this.config[key];
        if (!res) {
            throw new Error("нет такого ключа");
        }
        return res;
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
