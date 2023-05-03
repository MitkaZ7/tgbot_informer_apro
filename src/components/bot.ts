import { ConfigService } from '../config/config.service';
import { IconfigService } from '../config/config.interface';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Command } from '../comands/command.class';
import { StartCommand } from '../comands/start.command';
import LocalSession from 'telegraf-session-local';
class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];
  constructor(private readonly configService: IconfigService) {
    this.bot = new Telegraf < IBotContext > (this.configService.get('BOT_TOKEN'));
    this.bot.use(
      new LocalSession({ database: 'sessions.json' })).middleware();
  }

  init() {
    this.commands = [new StartCommand(this.bot)]
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}

export const bot = new Bot(new ConfigService());

