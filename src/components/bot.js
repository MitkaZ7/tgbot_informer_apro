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



const rateSearchHandler = (rate,id) => {
  bot.on('callback_query', query => {
    const monthQty = query.data
    // console.log(monthQty + 'RATE: ' + rate)
    searchRate(rate, monthQty)

      .then((rates) => {
        rates.forEach((rate) => {
          bot.sendMessage(id, createRateMarkup(rate), { parse_mode: 'HTML' })
            })
      })
      .catch((error) => {
        bot.sendMessage(id, debug(error))
      })
    // bot.answerCallbackQuery(query.id)
    }
  )

}

const companySearchHandler = () => {
    bot.onText(/.*/, async (msg) => {
      const chatId = msg.chat.id; // вынести во вне
      await searchCompany(msg)
        .then((company) => {
          if (company) {
            bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
          } else {
            bot.sendMessage(chatId, 'Такого клиента у нас нет. ❌', repeatOptions);
          }
          bot.removeTextListener(/.*/);
          repeatСlientSearch();
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

const repeatСlientSearch = () => {
  bot.onText(/Найти еще/, msg => {
    const { id } = msg.chat;
    bot.sendMessage(id, 'Пришли название клиента');
    bot.removeTextListener(/Найти еще/);
    searchCompanyHandler();
  })
}


export default function startBot() {

  bot.onText(/start/, async msg => {
    const { id } = msg.chat;
    const userId = msg.from.id;
    auth(userId)
      .then((isAllowed) => {
        !isAllowed ? bot.sendMessage(id, `❌ Доступ запрещен ❌`) : bot.sendMessage(id, `👋 Привет, что интересует?`, mainOptions)
      })
  });

  bot.on('callback_query', async query => {
    const { data } = query;
    const { id } = query.message.chat;

    // console.log(query)
    switch (data) {
// главное меню
      case 'getprice':
        bot.sendMessage(id, 'Выбери категорию:', rateOptions);
        break;

      case 'getсompany':
        bot.sendMessage(id, 'Пришли название клиента c большой буквы');
        companySearchHandler(data)

        break;

      // case 'getcontact':
      //   bot.sendMessage(id, 'Чьи контакты интересуют?');
      //   break;
// назад и повтор
      case 'back':
        bot.sendMessage(id, 'Что интересует?', mainOptions);
        break;

      case 'newquerry':
        bot.sendMessage(id, 'Пришли название клиента');
        companySearchHandler(id);
        break;
// выбор тарифа
      case 'itsbase':
      case 'itsprof':
        // rateSelectHandler()
        bot.sendMessage(id, 'Выбери период:', itsPeriodOptions);
        rateSearchHandler(data,id);
        break;
      case 'fnofd':
        bot.sendMessage(id, 'тут пока пусто)')
        break;
      case 'fresh':
        bot.sendMessage(id, 'Выбери период:', freshPeriodsOptions);
        rateSearchHandler(data, id);
        break;
// навигация  в главное меню
      case 'newchoice':
        bot.sendMessage(id, 'Выбери тариф:', rateOptions);
        break;
      case 'mainmenu':
        bot.sendMessage(id, 'Что интересует?', mainOptions);
        break;

      default:
        break;
    }
  })


//   bot.on('message', msg => {
//     const { id } = msg.chat;
//     if (msg.text === 'Найти клиента') {
//       bot.sendMessage(id,'Пришли название клиента c большой буквы',{
//         reply_markup: {
//           remove_keyboard: true
//         }
//       })
//         .then(async () => {
//           searchCompanyHandler();
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     } else if (msg.text === 'Узнать цены') {
//       bot.sendMessage(id, 'Выбери категорию:', rateOptions);
//       rateSelectHandler()
//       // .then(async () => {
//       //   // rateSelectHandler()
//       // }).then(select => {
//       //   console.log('select: ' + select)
//       // })


//         // .then(async () => {

//         //   .then((selected) => {
//         //     console.log('selected: ' + selected)
//         //   })
//         // })
//         // .then(async (slctdRate) => {
//         //   periodSelectHandler(slctdRate)
//         // })

//             // .then((selectedRate) => {

//             //  searchRate(selectedRate, Number(monthQty))
              // .then((rates) => {
              //   rates.forEach((rate) => {
              //     bot.sendMessage(id, createRateMarkup(rate), {parse_mode: 'HTML'})
              //       .then(() => {
              //         bot.onText(/Перевыбрать тариф/, msg =>{
              //           bot.sendMessage(id, 'Выбери тариф:', rateOptions);

              //         })
              //         bot.onText(/Выйти в главное меню/, msg => {
              //           bot.sendMessage(id, 'Что нибудь еще?', mainOptions);
              //         })

              //       })

//             // .then(() => {
//             //   bot.removeListener(periodRegExp);
//             // })

//       //     })
//       //   })
//       // })


//     } else if (msg.text === 'Получить контакты') {
//       console.log('Получить контакты')
//     } else if (msg.text === 'Назад') {
//       // bot.removeTextListener(/Назад/)
//       bot.sendMessage(id, 'Что интересует?', mainOptions);
//     } else {
//       return
//     }
//     return
//   })





//   const searchCompanyHandler = () => {
//     bot.onText(/.*/, async (msg) => {
//       const chatId = msg.chat.id; // вынести во вне
//       await searchCompany(msg)
//         .then((company) => {
//           if (company) {
//             bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
//           } else {
//             bot.sendMessage(chatId, 'Такого клиента у нас нет. ❌', repeatOptions);
//           }
//           bot.removeTextListener(/.*/);
//           repeatСlientSearch();
//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
//   }


}
