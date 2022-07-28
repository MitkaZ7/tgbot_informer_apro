import { Telegraf } from 'telegraf'
import { keyboard, backKeyboard } from './keyboard.js'
import { Keyboard, Key } from 'telegram-keyboard'
const bot = new Telegraf(process.env.TOKEN)


const main = (ctx) => {
  return ctx.reply('👋 Добро пожаловать! Что интересует?', Keyboard.reply(['ℹ️ О Клиенте','🤑 Цены ИТС', '📇 Контакты', '❌ Непродленные'], { columns: 3 }))
}


bot.start(main)
bot.hears('Назад', main)
bot.hears('ℹ️ О Клиенте', (ctx) => {
  const keyboard = Keyboard.make(['Запросить инфу', 'Прислать весь список'], { columns: 2 })

  return ctx.reply('ℹ️ О Клиенте', Keyboard.combine(keyboard, backKeyboard).reply())
})
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => {ctx.reply('👍')})
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.command('getContact', (ctx) => ctx.reply('Wanna get some contacts?'))
bot.command('getProfile', (ctx) => ctx.reply('Wanna know all about company?'))
bot.command('sayPrice', (ctx) => ctx.reply('Priceless'))
bot.command('getContact', (ctx) => ctx.reply('Wana get some contacts?'))

// bot.on('text', async (ctx) => {
//   await ctx.reply('Welcome main', keyboard)


// })



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

export default function launchBot() {
  bot.launch()
}
