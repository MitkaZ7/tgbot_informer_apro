import TelegramBot from "node-telegram-bot-api"

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
export default function startBot() {
  bot.on('message', async (msg) => {
    console.log(msg)
    const text = msg.text;
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Получил сообщение: ${text}`)
  })
}
