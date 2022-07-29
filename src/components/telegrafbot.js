import { Telegraf } from 'telegraf'
const bot = new Telegraf(process.env.TOKEN)
import { mainKeyboard, rateKeyboard } from './keyboard.js'
import { User } from '../models/user.js'
import { Company } from '../models/company.js'

const greeting = (ctx) => {
  const welcomeMsg = 'Привет! Что интересует?';
  ctx.reply(welcomeMsg, {
    reply_markup: {
      "resize_keyboard": true,
      keyboard: mainKeyboard
    }
  })
  console.log(ctx.message.text)
}

bot.action('navToRateKeyboard', async (ctx) => {


  // bot.telegram.sendPhoto(ctx.chat.id, {
  //   source: "res/dog.jpeg"
  // })

})

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





