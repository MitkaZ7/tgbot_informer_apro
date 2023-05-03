"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
var config_service_1 = require("../config/config.service");
var telegraf_1 = require("telegraf");
var start_command_1 = require("../comands/start.command");
var telegraf_session_local_1 = require("telegraf-session-local");
var Bot = /** @class */ (function () {
    function Bot(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get('BOT_TOKEN'));
        this.bot.use(new telegraf_session_local_1.default({ database: 'sessions.json' })).middleware();
    }
    Bot.prototype.init = function () {
        this.commands = [new start_command_1.StartCommand(this.bot)];
        for (var _i = 0, _a = this.commands; _i < _a.length; _i++) {
            var command = _a[_i];
            command.handle();
        }
        this.bot.launch();
    };
    return Bot;
}());
exports.bot = new Bot(new config_service_1.ConfigService());
