import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import auth from '../middlewares/auth.js'
import { searchCompany } from '../utils/searchCompany.js'
import { searchRate } from '../utils/searchRate.js'
import createCompanyMarkup from '../utils/companyMarkup.js'
import createRateMarkup from '../utils/rateMarkup.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
import { Company } from '../models/company.js'
import { debug } from '../utils/debug.js'
import { mainOptions, rateOptions, itsPeriodOptions, retailOptions, licenseOptions, repeatMain } from './keyboard.js'
Rate.hasMany(Company)
Company.hasMany(Rate)
export const bot = new TelegramBot(process.env.TOKEN, { polling: true });
let msgIds = [];
const sessions  = [

]


bot.on('message', async msg => {
  //  меню 1 уровень
  const text = msg.text;
  const msgId = msg.message_id;
  const chatId = msg.chat.id;
  const isAllowed = await auth(chatId);
  if (text === '/start' && isAllowed) {
    const user = {
      id: chatId,
      prevMenu: 'main'
    }
    sessions.push(user)
     Promise.all([
       bot.sendMessage(chatId, `🤙Привет ${msg.from.first_name}, что интересует?`, mainOptions)
    ])
    .then((result) => {
      msgIds.push(result[0].message_id)
      // console.log(msgIds[0])
      // console.log(user)
      // console.log(sessions)
    })
  }
  return
})

bot.on('callback_query', async msg => {
  const data = msg.data;
  const msg_id = msg.message.message_id;
  const chatId = msg.message.chat.id;
  let ratePrefix = null;
  let user = null
  sessions.forEach(elem => {
    if (elem.id === chatId) {
      user = elem;
    }
  });
  // console.log(user)

  // const msgID = msgIds[0];
  if (data === 'getprice') {

    // меню 2 уровень
    // console.log('MSG ID:' + msg_id)
    // console.log('CHAT ID:' + chatId)
    console.log(sessions)
    await bot.editMessageText('👇Выбери категорию: ', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });
    // console.log(rateOptions.inline_keyboard)
    await bot.editMessageReplyMarkup(rateOptions,
        {
          chat_id: chatId,
          message_id: msg_id,
        }
        );
  }
  if (data.match(/^(its_fresh|its_base|its_prof)$/gm)) {
    user.prevMenu = 'rates'
    console.log(sessions)
    // меню 3 уровень
    // ratePrefix = data;
    // const arr = createKEYS(periodMenuBtns, ratePrefix);
    // console.log(arr)
    await bot.editMessageText('👇Выбери период: ', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });
    await bot.editMessageReplyMarkup(itsPeriodOptions,
      {
        chat_id: chatId,
        message_id: msg_id,
      }
    );
    // console.log(`Выбран тариф: ${ratePrefix}`)
  }
  if (data === 'ofd') {

    ratePrefix = data;
    await bot.editMessageText('Комплект на какой период?', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });
    await bot.editMessageReplyMarkup(retailOptions,
      {
        chat_id: chatId,
        message_id: msg_id,
      }
    );
    console.log(`Выбран тариф: ${ratePrefix}`)
  }

  if (data === 'license') {
    ratePrefix = data;
    console.log(`Выбран тариф: ${ratePrefix}`)
    await bot.editMessageText('Выбери ПО', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });
    await bot.editMessageReplyMarkup(licenseOptions,
      {
        chat_id: chatId,
        message_id: msg_id,
      }
    );
  }
  if (user.prevMenu === 'rates' && data === 'back') {

    await bot.editMessageText('👇Выбери категорию: ', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });

    // console.log(rateOptions.inline_keyboard)
    await bot.editMessageReplyMarkup(rateOptions,
      {
        chat_id: chatId,
        message_id: msg_id,
      }
    );
    user.prevMenu = 'main'
    return
  }
  if (data === 'back' && user.prevMenu === 'main') {
    await bot.editMessageText('что интересует?', {
      chat_id: chatId,
      message_id: msg_id,
      parse_mode: 'Markdown'
    });
    // console.log(rateOptions.inline_keyboard)
    await bot.editMessageReplyMarkup(repeatMain,
      {
        chat_id: chatId,
        message_id: msg_id,
      }
    );
  }

});

