import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import { Company } from '../models/company.js'
// import { COMPANY_RATE_HUB } from '../models/company_rate_hub.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
// import createUserInDb  from '../models/user.js'
// import createClientinDb from '../models/client.js'
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

export default function startBot() {
  bot.on('message', async (msg) => {
    console.log(msg)
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Получил сообщение: ${text}`)
    try {
      if (text === '/start') {
        // await User.create({ chatId })
        return bot.sendMessage(chatId, `Добро пожаловать!`);
      }
      if (text === '/info') {
        const user = await User.findOne({ chatId })
        console.log(user) }
      if (text === '/newfirm') {



      }

    } catch (error) {

    }
  })

}
