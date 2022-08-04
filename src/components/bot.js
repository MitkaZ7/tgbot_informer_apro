import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import { Company } from '../models/company.js'
// import { COMPANY_RATE_HUB } from '../models/company_rate_hub.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
import { mainKeyboard, rateKeyboard } from './keyboard.js'
import { Op } from 'sequelize'
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

Rate.hasMany(Company)
Company.hasMany(Rate)



bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const result = await Company.findOne({
    where: {
      company_name: {
        [Op.substring]: text
      }
    }
  })
  .then(firm => {
    if (!firm) {
      return 'Контрагент не найден'
    }
    const { company_name, inn, partnership } = firm.dataValues
    console.log(company_name)
    return company_name
  })
  // console.log(result)

  bot.sendMessage(chatId, `Найден контрагент: ${result}`);
});

export default function startBot() {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.onText(/^\/start$/, function (msg) {
      const buttons = {
        reply_to_message_id: msg.message_id,
        reply_markup: {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: mainKeyboard
        }
      };

      bot.sendMessage(chatId, "👋 Добро пожаловать!", buttons);
    });



    try {
        if (text === '/info') {
          const user = await User.findOne({ chatId })
          console.log(user) }
        if (text === '/add') {
        await Rate.findOne({ where: { title: 'КП ПРОФ 12 Льготный'}})
        .then(rate => {
          if (!rate) {
            return console.log('rate not found');
          }

          conosole.log(rate)
        })



      }

    } catch (error) {

    }
  })

}
