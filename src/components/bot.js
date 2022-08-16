import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import auth from '../middlewares/auth.js'
import { searchCompany } from '../utils/searchCompany.js'
import { searchRate } from '../utils/searchRate.js'
import createCompanyMarkup from '../utils/companyMarkup.js'
import createRateMarkup from '../utils/rateMarkup.js'
// import { COMPANY_RATE_HUB } from '../models/company_rate_hub.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
import { Company } from '../models/company.js'
import { debug } from '../utils/debug.js'
import {
  mainOptions,
  repeatOptions,
  rateOptions,
  itsPeriodOptions,
  freshPeriodsOptions
} from './keyboard.js'
export const bot = new TelegramBot(process.env.TOKEN, { polling: true });

Rate.hasMany(Company)
Company.hasMany(Rate)


async function rateSearchHandler() {
  let rateData = {
    rate: null,
    period: null,
  }
  const rateRegExp = /ИТС/ui;
  bot.onText(rateRegExp, async (msg) => {
    const chatId = msg.chat.id
    rateData.rate = msg.text
    bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
    // bot.removeTextListener(rateRegExp)
  })
  const periodRegExp = /(\d{1,2}\sмес)/ui;
  bot.onText(periodRegExp, async (msg) => {
    rateData.period = msg.text.split(' ')[0]
    console.log(rateData)
    // bot.removeTextListener(periodRegExp);
  })
  // return rateData



}

//  async function searchRate(queryData) {
//   await searchRate(rateData)
//     .then((rates) => {
//       rates.forEach((rate) => {
//         bot.sendMessage(id, createRateMarkup(rate), { parse_mode: 'HTML' })
//       })
//     })
// }



export default function startBot() {
  const startRegEx = /start/;
  bot.onText(startRegEx, async msg => {
    const { id } = msg.chat;
    const userId = msg.from.id;
    auth(userId)
      .then((isAllowed) => {
        !isAllowed ? bot.sendMessage(id, `❌ Доступ запрещен ❌`) : bot.sendMessage(id, `👋 Привет, что интересует?`, mainOptions)
      })
  });



  function findRate(id){
    let rateData = {
      rate: null,
      period: null,
    }
    const rateRegExp = /КП/ui;
    bot.sendMessage(id, 'Выбери категорию:', rateOptions)

    bot.onText(rateRegExp, async (msg) => {
      const chatId = msg.chat.id
      rateData.rate = msg.text
      bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
        .then(() => {
          const periodRegExp = /(\d{1,2}\sмес)/ui;
          bot.onText(periodRegExp, async (msg) => {
            rateData.period = msg.text.split(' ')[0]
            console.log(rateData)
            await searchRate({ rateData }).then((rates) => {
              rates.forEach((rate) => {
                bot.sendMessage(id, createRateMarkup(rate), { parse_mode: 'HTML' })
              })
            })
            // bot.removeTextListener(periodRegExp);
          })
        })
      // bot.removeTextListener(rateRegExp)
    })
  }

  bot.on('message', async msg => {
    const { id } = msg.chat;

    switch (msg.text) {
      case 'Найти клиента':
        bot.sendMessage(id, 'Пришли название клиента c большой буквы')
          .then(async () => {
            searchCompanyHandler();
          })
          .catch((error) => {
            console.log(error)
          })
        break;

      case 'Узнать цены':
        findRate(id)
        break;

      case 'Назад':
      case 'Выйти':
        bot.sendMessage(id, 'Что интересует?', mainOptions);
        break;

      case 'Фреш':
      case 'ФН и ОФД':
        bot.sendMessage(id, 'Этот раздел пока не доступен, выбери другой', rateOptions)

        break;
      case 'Другой тариф':
        bot.sendMessage(id, 'Выбери тариф', rateOptions)

      default:
        break;
    }



  })









  const searchCompanyHandler = () => {
    const allRegExp = /(.*)/
    bot.onText(allRegExp, async (msg) => {
      const chatId = msg.chat.id; // вынести во вне
      await searchCompany(msg)
        .then((company) => {
          if (company) {
            bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
          } else {
            bot.sendMessage(chatId, 'Такого клиента у нас нет. ❌', repeatOptions);
          }
          repeatSearchCompany()
          bot.removeTextListener(allRegExp);
          repeatСlientSearch();
        })
        .catch((error) => {
          // bot.sendMessage(chatId, debug(error))
        })
    })
  }

  const repeatSearchCompany = () => {
    const repeatRegExp = /Найти еще/u;
    bot.onText(repeatRegExp, async (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, 'Пришли название клиента');
      bot.removeTextListener(repeatRegExp);
      searchCompanyHandler();
    })
  }




}
