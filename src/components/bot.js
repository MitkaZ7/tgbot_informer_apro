import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
import auth from '../middlewares/auth.js'
import { searchCompany } from '../utils/searchCompany.js'
import { searchRate } from '../utils/searchRate.js'
import createCompanyMarkup from '../utils/companyMarkup.js'
import createRateMarkup from '../utils/rateMarkup.js'
import { Contact } from '../models/contact.js'
import { Rate } from '../models/rate.js'
import { Company } from '../models/company.js'
import { debug } from '../utils/debug.js'
import { Keyboard, Key } from 'telegram-keyboard';
import {
  mainMenuBtns,
  rateMenuBtns,
  periodMenuBtns,
  retailMenuBtns,
  licenseBtns,

} from './keyboard.js'
Rate.hasMany(Company)
Company.hasMany(Rate)
export const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const mainKeyboard = Keyboard.make(mainMenuBtns,{
  wrap: (row, index, button) => Math.random() > 0.4
}).inline();
const rateKeyboard = Keyboard.make(rateMenuBtns,{
  columns: 2,
}).inline();
const licenseKeyboard = Keyboard.make(licenseBtns, {
  columns: 2,
}).inline();
const retailKeyboard = Keyboard.make(retailMenuBtns, {
  columns: 2,
}).inline();


bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const isAllowed = await auth(chatId);
  if (text === '/start') {
    !isAllowed ?
      bot.sendMessage(chatId, `❌ Доступ запрещен ❌ `)
      : bot.sendMessage(chatId, `🤙Привет ${msg.from.first_name}, что интересует?`, mainKeyboard)
  }

  return
})

const createKeyboard = (btns, prefix) => {
  const arr = []
  for (let i = 0; i < btns.length; i++) {
    btns[i].callback_data = `${prefix}`+ '_' + btns[i].callback_data;
    // console.log(btns[i])
    arr.push(btns[i])

  }
  console.log(arr)
}

function createKEYS(btns, prefix){
  const arr = []
  btns.forEach(elem => {
     elem.callback_data = `${prefix}` + '_' + elem.callback_data;
     arr.push(elem)
  })
  return {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [arr]
    }
  }
}

const newFindRate = async (rateData) => {
  // rateData = 'pits_base_12'
  const response =  searchRate(rateData);
  console.log(response)
  // response.forEach((rate) => {
  //   bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
  // })

  // const rateRegExp = /КП/ui;
  // bot.sendMessage(chatId, 'Выбери категорию:', rateOptions)

  // bot.onText(rateRegExp, (msg) => {
  //   let chatId = msg.chat.id;
  //   rateData.rate = msg.text
  //   bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
  //     .then(() => {
  //       const periodRegExp = /(\d{1,2}\sмес)/ui;
  //       bot.onText(periodRegExp, async (msg) => {
  //         rateData.period = msg.text.split(' ')[0]
  //         console.log(rateData);
  //         const response = await searchRate({ rateData });
  //         response.forEach((rate) => {
  //           bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
  //         })
  //       })
  //     })
  // })
}

bot.on('callback_query', async msg => {
  // const ratesMenu = createMenu(ratesMenuBtns)
  const data = msg.data;
  const chatId = msg.message.chat.id;
  let ratePrefix = null;

  if (data === 'getprice') {
    await bot.sendMessage(chatId, `👇Выбери тариф:`, rateKeyboard);
  }

  if (data.match(/^(its_fresh|its_base|its_prof)$/gm)) {
    ratePrefix = data;
    const arr = createKEYS(periodMenuBtns, ratePrefix);
    console.log(arr)

    bot.sendMessage(chatId, `👇Выбери период:`, arr);
    console.log(`Выбран тариф: ${ratePrefix}`)
  }

  if (data === 'ofd') {
    ratePrefix = data;
    bot.sendMessage(chatId, 'на сколько месяцев?', retailKeyboard)
    console.log(`Выбран тариф: ${ratePrefix}`)
  }

  if (data === 'license') {
    ratePrefix = data;
    bot.sendMessage(chatId, 'Выбери ПО:', licenseKeyboard)
    console.log(`Выбран тариф: ${ratePrefix}`)
  }
  if (data.match(/^(its_(base|prof|fresh)_\d{1,2})$/gmi)) {
    let searchRateData = data;
    newFindRate(searchRateData)
    // console.log('MATCH')
  }



   console.log(data)
})


  // if (data === 'getсompany') {
  //   await bot.sendMessage(chatId, `Пришли название клиента`);
  // }
  // if (data === 'itsBase' || data === 'itsProf') {
  //   rateData.name = data;
  //   console.log(rateData)
  //   bot.sendMessage(chatId, `Выбери период👇`, itsPeriodOptions)
  // }
  // if (!data.match(periodRegExp)) {
  //   console.log(data.split(' ')[0])
  //   rateData.period = data.split(' ')[0];
  //   console.log(rateData)
  // }






  // switch (text) {
  //   case 'Узнать цены':
  //   case '/getprice':
  //
  //     break;
  //   case 'Найти клиента':
  //   case '/getclient':
  //     bot.sendMessage(chatId, `Пришли название клиента:`)
  //     // bot.onText(/(.*)/, msg => {
  //     //   searchCompany(text)
  //     //     .then((company) => {
  //     //       if (company) {
  //     //         bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
  //     //       } else {
  //     //         bot.sendMessage(chatId, '❌ Такого клиента у нас нет. Попробуй еще или вернись назад. ❌');
  //     //       }
  //     //     })
  //   default:
  //     bot.sendMessage(chatId, ` я тебя не понял`)
  //     break;
  // }




// bot.on('callback_query', (querry) => {
//   const chatId = querry.message.chat.id;
//   switch (querry.data) {
//     case 'getсompany':
//       bot.sendMessage(chatId, 'Пришли название клиента c большой буквы')
//       addTextLitener(/(.*)/, msg => {
//         searchCompany(msg)
//           .then((company) => {
//             if (company) {
//               bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
//             } else {
//               bot.sendMessage(chatId, '❌ Такого клиента у нас нет. Попробуй еще или вернись назад. ❌', mainOptions);
//             }
//           })
//       })
//       break;
//       case 'getprice':
//         bot.sendMessage(chatId, 'Выбери категорию:', rateOptions);
//         let rateData = {
//           rate: null,
//           period: null,
//         }
//         addTextLitener(/КП/ui,  msg => {
//           rateData.rate = msg.text;
//           console.log(rateData)
//           bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
//             .then(removeTextListener(/КП/ui))
//             .then(addTextLitener(/(\d{1,2}\sмес)/ui, async msg =>{
//               rateData.period = msg.text.split(' ')[0];
//               console.log(rateData);
//               const res = await searchRate({ rateData });
//               // console.log(res)
//               res.forEach((rate) => {
//                 bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' });
//                 rateData.rate = null;
//                 rateData.period = null;
//               })
//             }))
//            bot.sendMessage(chatId, 'Что нибудь еще?', mainOptions)

//         })
//     default:
//       removeTextListener(/(.*)/);
//       break;

//   }
// })
// const searchCompanyHandler = () => {
//   const allRegExp = /(.*)/
//   bot.onText(allRegExp,  (msg) => { // bot.onText это слушатель произвольного соодщения от пользователя,
//     // который в итоге вызовет функцию при получении нужного текста.
//     const chatId = msg.chat.id;
//     searchCompany(msg) // тут обращение к бд
      // .then((company) => {
      //   if (company) { // если нашлась то будет ответ с данными
      //     bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
      //   } else { // иначе
//           bot.sendMessage(chatId, '❌ Такого клиента у нас нет. Попробуй еще или вернись назад. ❌', repeatOptions);
//         }
//         repeatSearchCompany() // код для повтора поиска клиента, может он не нужен? сам код это ф-ии в ниже в комменте
//         bot.removeTextListener(allRegExp); // -это моя попытка убрать обьявленный в начале слушатель текста от пользователя
//         //чтобы бот не искал бесконечно клинета, но оно не совсем работает) Бот перестает искать клиента когда пользователь
//         // нажмет на кнопку на клаве

//       })
//       .catch((error) => {
//         // bot.sendMessage(chatId, debug(error))
//       })
//   })ко
// }  

//   const repeatSearchCompany = () => {
//     const repeatRegExp = /Найти еще/u;
//     bot.onText(repeatRegExp, async (msg) => {
//       const chatId = msg.chat.id;
//       bot.sendMessage(chatId, 'Пришли название клиента');
//       bot.removeTextListener(repeatRegExp);
//       searchCompanyHandler();
//     })
//   }











  // -----
  // if (querry.data === 'getсompany') {
  //   bot.sendMessage(chatId, 'Пришли название клиента ...')
  //   searchCompanyHandler();
  //   // bot.removeListener("callback_query");
  // } else if (querry.data === 'getprice') {
  //   bot.sendMessage(chatId, 'Выбери категорию:', rateOptions);

  //   // const rateRegExp = /КП/ui;
    // let rateData = {
    //   rate: null,
    //   period: null,
    // }
    // bot.onText(rateRegExp, async (msg) => {

      // rateData.rate = msg.text;
      // console.log(rateData)
      // bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions);

    //   bot.removeTextListener(rateRegExp);
      // const periodRegExp = /(\d{1,2}\sмес)/ui;
      // bot.onText(periodRegExp, async (msg) => {
        // rateData.period = msg.text.split(' ')[0];
        // console.log(rateData);
        // const response = await searchRate({ rateData });
        // response.forEach((rate) => {
        //   bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' });

        // })
    //     await bot.sendMessage(chatId,'Что нибудь еще?',repeatOptions)
    //     bot.on('callback_query', (repeatQuerry) => {
    //       if (querry.data === 'newquerry') {
    //         console.log('newquerry')

    //       } else if (querry.data === 'exit') {
    //         console.log('exit')
    //       }
    //     })
    //   })
        // .then(() => {
        //   const periodRegExp = /(\d{1,2}\sмес)/ui;
        //   bot.onText(periodRegExp, async (msg) => {
        //     rateData.period = msg.text.split(' ')[0]
        //     console.log(rateData);
        //     const response = await searchRate({ rateData });
            // response.forEach((rate) => {
            //   bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
            // })


        //   })
        // })
      // bot.removeTextListener(rateRegExp)
      // bot.removeTextListener(periodRegExp);

    // })



// async function rateSearchHandler() {
  // let rateData = {
  //   rate: null,
  //   period: null,
  // }
//   const rateRegExp = /ИТС/ui;
//   bot.onText(rateRegExp, async (msg) => {
//     const chatId = msg.from.id
//     rateData.rate = msg.text
//     bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
//     // bot.removeTextListener(rateRegExp)
//   })
//   const periodRegExp = /(\d{1,2}\sмес)/ui;
//   bot.onText(periodRegExp, async (msg) => {
//     rateData.period = msg.text.split(' ')[0]
//     console.log(rateData)
//     // bot.removeTextListener(periodRegExp);
//   })
//   // return rateData



// }

//  async function searchRate(queryData) {
//   await searchRate(rateData)
//     .then((rates) => {
//       rates.forEach((rate) => {
//         bot.sendMessage(id, createRateMarkup(rate), { parse_mode: 'HTML' })
//       })
//     })
// }


// function findRate(chatId){
//     let rateData = {
//       rate: null,
//       period: null,
//     }
//     const rateRegExp = /КП/ui;
//   bot.sendMessage(chatId, 'Выбери категорию:', rateOptions)

//     bot.onText(rateRegExp, (msg) => {
//       let chatId = msg.chat.id;
//       rateData.rate = msg.text
//       bot.sendMessage(chatId, 'Выбери период:', itsPeriodOptions)
//         .then(() => {
//           const periodRegExp = /(\d{1,2}\sмес)/ui;
//           bot.onText(periodRegExp, async (msg) => {
//             rateData.period = msg.text.split(' ')[0]
//             console.log(rateData);
//             const response = await searchRate({ rateData });
//             response.forEach((rate) => {
//               bot.sendMessage(chatId, createRateMarkup(rate), { parse_mode: 'HTML' })
//             })


//           })
//         })
//       // bot.removeTextListener(rateRegExp)
//       bot.removeTextListener(periodRegExp);
//     })
//   }
















// export default function startBot() {

// }


//const itsKeyboard = {
//   '1 мес': 1,
//   '3 мес': 3,
//   '6 мес': 6,
//   '12 мес': 12,
//   '24 мес': 24,

// }
// const sendMessage = (text,keyboard) => {
//   const chatId = data.chat.id;
//   bot.sendMessage(chatId, text, keyboard)
// }
// function removeTextListener(regExp) {
//   bot.removeTextListener(regExp);
// }
// const addTextLitener = (regExp) => {
//   bot.onText(regExp);

// }

// bot.onText(/\/start/, async msg => {
//   let chatId = msg.chat.id;
//   auth(chatId)
//     .then((isAllowed) => {
//       !isAllowed ?
//         bot.sendMessage(chatId, `❌ Доступ запрещен ❌ `)
//         : bot.sendMessage(chatId, `👋 Привет ${msg.from.first_name}, что интересует?`, mainOptions)
//     });
// });
// bot.setMyCommands([
//   { command: '/start', description: 'Начать' },
//   { command: '/getprice', description: 'Узнать цены' },
//   { command: '/getclient', description: 'Найти клиента' },
//   { command: '/help', description: 'Список команд' }
// ])

