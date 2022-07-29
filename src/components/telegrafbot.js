import { Telegraf } from 'telegraf'
const bot = new Telegraf(process.env.TOKEN)
import { mainKeyboard, rateKeyboard } from './keyboard.js'
import { User } from '../models/user.js'
import { Company } from '../models/company.js'

const greeting = (ctx) => {
  const userName = ctx.message.chat.username;
  const welcomeMsg = `Привет ${userName} ! Что интересует?`;
  ctx.reply(welcomeMsg, {
    reply_markup: {
      "resize_keyboard": true,
      keyboard: mainKeyboard
    }
  })
  // console.log(ctx.message)
}

bot.action('navToRateKeyboard', async (ctx) => {


})

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.answerInlineQuery


  // Using context shortcut
  ctx.answerCbQuery()
})

// bot.on('callback_query', async msg => {
//   const data = msg.data;
//   const chatId = msg.message.chat.id;
//   if (data === '/again') {
//     return startGame(chatId)
//   }
//   const user = await UserModel.findOne({ chatId })
//   if (data == chats[chatId]) {
//     user.right += 1;
//     await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
//   } else {
//     user.wrong += 1;
//     await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
//   }
//   await user.save();
// })





bot.hears('get', async (ctx) => {
  const firm = await Company.findByPk(2)
  .then(company => {
    console.log(company.company_name)
    ctx.reply(company.company_name)
  })
  .catch(err => console.log(err))


})








bot.command('getcontact', (ctx) => ctx.reply('Wanna get some contacts?'))
bot.command('getprofile', (ctx) => ctx.reply('Wanna know all about company?'))
bot.command('getprice', (ctx) => ctx.reply('Priceless'))



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
//
bot.start(greeting)
export default function launchBot() {
  bot.launch()
}





