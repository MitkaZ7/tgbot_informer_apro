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
  periodOptions,
} from './keyboard.js'
export const bot = new TelegramBot(process.env.TOKEN, { polling: true });

Rate.hasMany(Company)
Company.hasMany(Rate)

function rateSelectHandler() {
  const rateRegExp = /ИТС/iu;
  bot.onText(rateRegExp, msg => {
    const { id } = msg.chat;
    const rate = msg.text
    console.log(rate)
    return rate
  })
  // .then((selectedRate)=>{
  //   console.log('SelectedRATE: ' + selectedRate)
  //   return selectedRate
  // })
}

const periodSelectHandler = (rate) => {
  const periodRegExp = /\d{1,2}/;
  console.log('rate is:' + rate)
  bot.onText(periodRegExp, (msg, [monthQty]) => {

  })
  // bot.removeListener(regexp)
  // return selectedRate
}


export default function startBot() {

  bot.on('message', msg => {
    const { id } = msg.chat;
    if (msg.text === 'Найти клиента') {
      bot.sendMessage(id,'Пришли название клиента c большой буквы',{
        reply_markup: {
          remove_keyboard: true
        }
      })
        .then(async () => {
          searchCompanyHandler();
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (msg.text === 'Узнать цены') {
      bot.sendMessage(id, 'Выбери категорию:', rateOptions);
      // .then(async () => {
      //   // rateSelectHandler()
      // }).then(select => {
      //   console.log('select: ' + select)
      // })


        // .then(async () => {

        //   .then((selected) => {
        //     console.log('selected: ' + selected)
        //   })
        // })
        // .then(async (slctdRate) => {
        //   periodSelectHandler(slctdRate)
        // })

            // .then((selectedRate) => {

            //  searchRate(selectedRate, Number(monthQty))
            //   .then((rates) => {
                // rates.forEach((rate) => {
                //   bot.sendMessage(id, createRateMarkup(rate), {parse_mode: 'HTML'})
                    // .then(() => {
                    //   bot.onText(/Перевыбрать тариф/, msg =>{
                    //     bot.sendMessage(id, 'Выбери тариф:', rateOptions);

                    //   })
                    //   bot.onText(/Выйти в главное меню/, msg => {
                    //     bot.sendMessage(id, 'Что нибудь еще?', mainOptions);
                    //   })

                    // })

            // .then(() => {
            //   bot.removeListener(periodRegExp);
            // })

      //     })
      //   })
      // })


    } else if (msg.text === 'Получить контакты') {
      console.log('Получить контакты')
    } else if (msg.text === 'Назад') {
      // bot.removeTextListener(/Назад/)
      bot.sendMessage(id, 'Что интересует?', mainOptions);
    } else {
      return
    }
    return
  })


 bot.onText(/start/, async msg => {
   const { id } = msg.chat;
   const userId = msg.from.id;
  // const {username} = msg.from;
  //  await User.create({ tg_id: userId, name: username })
   auth(userId)
   .then((isAllowed) => {
     !isAllowed ? bot.sendMessage(id, `❌ Доступ запрещен ❌`) : bot.sendMessage(id, `👋 Привет, что интересует?`, mainOptions)
   })
 });

 const repeatСlientSearch = () => {
   bot.onText(/Найти еще/,  msg => {
     const { id } = msg.chat;
     bot.sendMessage(id, 'Пришли название клиента');
     bot.removeTextListener(/Найти еще/);
     searchCompanyHandler();
 })
}

  const searchCompanyHandler = () => {
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


}
