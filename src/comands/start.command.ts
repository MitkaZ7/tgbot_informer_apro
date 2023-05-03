import { IBotContext } from "../context/context.interface";
import { Command } from "./command.class";
import { Telegraf, Markup } from 'telegraf';

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start( async (ctx) => {
      console.log(ctx.session)
      ctx.deleteMessage();
      await ctx.reply('Привет, что интересует?', Markup.keyboard([
        [
          Markup.button.text('Цены'),
          Markup.button.text('Клиенты'),
        ]
        ])
      );

    });
    this.bot.hears('Цены', (ctx)=> {
      ctx.editMessageText('Выбери категорию:')
    })
    this.bot.hears('Клиенты', (ctx) => {

    })


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
