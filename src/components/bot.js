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
import { mainOptions, rateOptions, itsPeriodOptions, retailOptions, licenseOptions, repeatMain, restartSearch, periodKeyboard } from './keyboard.js'
Rate.hasMany(Company)
Company.hasMany(Rate)
export const bot = new TelegramBot(process.env.TOKEN, { polling: true });
let msgIds = [];
const sessions  = [

]
function addRatePrefix(btns, prefix) {
  const arr = []
  btns[0].forEach(elem => {
    elem.callback_data = `${prefix}` + '_' + elem.callback_data;
    arr.push(elem)
  })
  arr.push(btns[1])
  // console.log(arr)
  return arr
  // return {
  //   reply_markup: {
  //     resize_keyboard: true,
  //     inline_keyboard: [arr]
  //   }
  // }
}
const findRate = async (rateData) => {

}


bot.on('message', async msg => {
  //  меню 1 уровень
  const text = msg.text;
  const chatId = msg.chat.id;
  console.log(chatId)
  const isAllowed = await auth(chatId);
  if (text === '/start' && isAllowed) {
    const user = {
      chatId: chatId,
      msgId: null,
      prevMenu: 'main',
      msgId: null,
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
  let user = null;
  sessions.forEach(elem => {
    if (elem.chatId === chatId) {
      user = elem;
    }
  });
  console.log('user down')
  console.log(user)

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
    // user.prevMenu = 'rates'
    // console.log(sessions)
    // меню 3 уровень
    ratePrefix = data;
    const arr = addRatePrefix(periodKeyboard, ratePrefix);
    // console.log(periodKeyboard)
    console.log(arr)
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

    console.log(`Выбран тариф: ${ratePrefix}`)
    return
  }

  if (data.match(/^(its_(base|prof|fresh)_\d{1,2})$/gmi)) {
    let itsSearchData = data;
    findRate(itsSearchData)
    // console.log('MATCH')
    console.log('ratePrefix: ' + ratePrefix)
    const response = await searchRate(itsSearchData);
    response.forEach( async (rate)  => {
       await bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
    })
    // bot.deleteMessage(chatId, msg_id)
    // bot.sendMessage(chatId, 'Выбрать другую категорию?')
    // await bot.editMessageText('Другой тариф?', {
    //   chat_id: chatId,
    //   message_id: msg_id,
    //   parse_mode: 'Markdown'
    // });

  }

  if (data === 'ofd') {
    // user.prevMenu = 'rates'
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
    // user.prevMenu = 'rates'
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
  if (data.match(/^ofd_\d{2}$/gmi)) {
    console.log(data)
    let ofdSearchData = data;
    findRate(ofdSearchData)
    // console.log('MATCH')
    const response = await searchRate(ofdSearchData);
    response.forEach((rate) => {
      bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
    })
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

