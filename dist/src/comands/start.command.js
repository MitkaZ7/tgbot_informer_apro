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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_class_1 = require("./command.class");
const telegraf_1 = require("telegraf");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => __awaiter(this, void 0, void 0, function* () {
            console.log(ctx.session);
            ctx.deleteMessage();
            yield ctx.reply('Привет, что интересует?', telegraf_1.Markup.keyboard([
                [
                    telegraf_1.Markup.button.text('Цены'),
                    telegraf_1.Markup.button.text('Клиенты'),
                ]
            ]));
        }));
        this.bot.hears('Цены', (ctx) => {
            ctx.editMessageText('Выбери категорию:');
        });
        this.bot.hears('Клиенты', (ctx) => {
        });
        // this.bot.action('getprice', (ctx) => {
        //   ctx.session.getprice = true;
        //   ctx.editMessageText('Выбери категорию:')
        // });
        // this.bot.action('getcompany', (ctx) => {
        //   ctx.session.getcompany = true;
        //   ctx.editMessageText('Пришли название клиента')
        // });
    }
}
exports.StartCommand = StartCommand;
