import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import { searchCompany } from '../utils/searchCompany.js'
import createCompanyMarkup from '../utils/companyMarkup.js'
// import { COMPANY_RATE_HUB } from '../models/company_rate_hub.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
import { Company } from '../models/company.js'
import { mainOptions, repeatOptions } from './keyboard.js'

export const bot = new TelegramBot(process.env.TOKEN, { polling: true });

Rate.hasMany(Company)
Company.hasMany(Rate)




export default function startBot() {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id; // вынести во вне
    if (text === '/start') {
      bot.sendMessage(chatId, "👋 Привет, что интересует?", mainOptions);
    }
  });

  function searcHandler(msg) {
    bot.onText(/.*/, async (msg) => {
      const chatId = msg.chat.id; // вынести во вне
      const company = await searchCompany(msg)
        .then((company) => {
          if (company) {
            bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
            bot.clearTextListeners();
          } else {
            bot.clearTextListeners();
            bot.sendMessage(chatId, '😕 Такого клиента у нас нет.', repeatOptions)
          }
        })
    });
  }

  //

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id; // вынести во вне
    // console.log(data);
    // console.log(chatId);
    if (data === 'back') {
      bot.sendMessage(chatId, "👋 Привет, что интересует?", mainOptions);
    };
    if (data === 'getсompany') {
      bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
      searcHandler(msg);
    };
    if (data === 'newquerry') {
      bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
      searcHandler(msg);
    }
  })



}
