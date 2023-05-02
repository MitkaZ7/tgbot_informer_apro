import TelegramBot from "node-telegram-bot-api"
import auth from '../middlewares/auth.js'
import { InlineKeyboard, Row, KeyboardButton, InlineKeyboardButton } from "node-telegram-keyboard-wrapper";

export const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const inlineKeyboard1 = new InlineKeyboard();

// const ratesMenuBtns = [
//   { text: 'КП ПРОФ', cbd: 'its_prof' },
//   { text: 'КП Базовый', cbd: 'its_base' },
//   { text: 'ФРЕШ', cbd: 'its_fresh' },
//   { text: 'ФН/ОФД', cbd: 'fnofd' },
//   { text: '1С', cbd: 'licenses' },

// ];
const mainMenuBtns = [
  { text: 'Цены', cbd: 'getprice' },
  { text: 'Клиенты', cbd: 'getcompany'},
];




const createKeyboard = (array) => {
  for (let i=0; i<array.length; i++) {
    inlineKeyboard1.push(
       new Row(
        new InlineKeyboardButton(`${array[i].text}`, `callback_data`, `${array[i].cbd}`),
      )
    )
  }
}

bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const isAllowed = await auth(chatId);
  if (text === '/start') {
    const keyboard = createKeyboard(mainMenuBtns)

    !isAllowed ?
      bot.sendMessage(chatId, `❌ Доступ запрещен ❌ `)
      : bot.sendMessage(chatId, `🤙Привет ${msg.from.first_name}, что интересует?`, {
        reply_markup: inlineKeyboard1.getMarkup(),
      })
  }
  return
})


bot.on('callback_query', async msg => {
  // const ratesMenu = createMenu(ratesMenuBtns)
  const data = msg.data;
  const chatId = msg.message.chat.id;
  const periodRegExp = /\d{1,2}/;
  bot.sendMessage(chatId, `CBD: ${data}`)

  if (data === 'getprice') {
    // const keyboard = await createKeyboard(ratesMenuBtns)
    await bot.sendMessage(chatId, `Выбери тариф👇`);

  }

  if (data === 'getcompany') {
    await bot.sendMessage(chatId, `Пришли название клиента...`,);

  }
  // if (data.startsWith('its')) {
  //   let ratePreffix = null;
  //   await bot.sendMessage(chatId, `Выбери период👇`, itsPeriodOptions);
  //   ratePreffix = data;
  //   bot.sendMessage(chatId, `ТАРИФ: ${ratePreffix}`)

  // }
  // if (typeof data === 'number') {
  //   console.log(typeof data)
  //   rateData.period = data;
  //   bot.sendMessage(chatId, `ПЕРИОД: ${rateData.period} ТАРИФ: ${rateData.name}`)
  // }
  // console.log(data.match(periodRegExp))
})
bot.on("polling_error", (err) => console.log(err));
