import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'

const searchRate = async (chatId) => {
  const buttons = {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: rateKeyboard
    }
  };
  await bot.sendMessage(chatId, 'Выбери категорию', buttons);
}
