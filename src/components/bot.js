import TelegramBot from "node-telegram-bot-api"
import { User } from '../models/user.js'
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
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

Rate.hasMany(Company)
Company.hasMany(Rate)


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
        await bot.sendMessage()
      })
      .catch((error) => {
        console.log(error)
      })
      console.log('Найти клиента')
    } else if (msg.text === 'Узнать цены') {

      console.log('Узнать цены')
    } else if (msg.text === 'Получить контакты') {
      console.log('Получить контакты')
    } else {
      return
    }
    return
  })


 bot.onText(/start/, msg => {
   const { id } = msg.chat;
   bot.sendMessage(id, `👋 Привет, что интересует?`, mainOptions)
   .then(() => {
      console.log('mainKeyboard')
   })
   .catch((error) => {
      console.log(error)
   })
 });

 bot.onText(/getclient (.+)/,(msg, [source, match])=>{
   const { id } = msg.chat;
  //  bot.sendMessage(id, debug(match))
   searchCompanyHandler(msg); // не работает
 });

 bot.onText(/← Назад/, msg => {

 })


  // bot.on('message', async (msg) => {
  //   const {id} = msg.chat;
  //   const {text} = msg;
  //   const { first_name } = msg.from;
  //   // const chatId = msg.chat.id; //
  //   if (text === '/start') {
  //     bot.sendMessage(id, `👋 Привет ${first_name}, что интересует?`, mainOptions)
  //     .then(()=>{

  //     })
      // .catch((error)=>{
      //   console.log(error)
      // })
  //   } else {
  //     bot.sendMessage(id, debug(msg))
  //   }

  //   // console.log(msg.from.id)
  //   // if (text === '/start') {

  //   //   // getCompanyName(msg)
  //   // }
  // });

 const repeatСlientSearch= () => {
   bot.onText(/Найти еще/,  msg => {

     const { id } = msg.chat;
     bot.sendMessage(id, 'Пришли название клиента');
     bot.removeTextListener(/Найти еще/);
     searchCompanyHandler();
 })
}
const backToMainMenu = () => {
  bot.onText(/Назад/, msg => {
    const { id } = msg.chat;
    bot.sendMessage(id, 'Вернуться в главное меню', mainOptions);
    bot.removeTextListener(/Назад/);
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
  //
  function periodSelect(chatId, categoryData){
    let selectedPeriod = null;
    const id = chatId;
    const choosenCategory = categoryData;
    console.log('CHATID: ' + id);
    console.log('CATEGORY: ' + categoryData);
    bot.sendMessage(id, 'Выбери период:', periodOptions)
    bot.on('callback_query', async (msg) => {
      selectedPeriod = msg.data;
      console.log('SELECTED PERIOD: ' + selectedPeriod + ' КАТЕГОРИЯ: ' + choosenCategory);
      bot.clearTextListeners();
    })

  }
  //
  function getRatesHandler() {
    bot.on('callback_query', async (msg) => {
      const chatId = msg.message.chat.id; // снова тупой дубль
      const categoryData = msg.data;
      console.log('chatId: ' + chatId)
      console.log('пес, вот данные категории: ' + categoryData);
      periodSelect(chatId, categoryData)




      // const ratesArray = await searchRate(categoryData)
      // const mappedRates = ratesArray.map((elem, i) =>{
      //   return { index: i, rate: elem.dataValues}
      // })
      // const sortedRates = mappedRates.sort((a, b) => {
      //   return a.rate.price - b.rate.price
      // })

      // sortedRates.forEach(rate => bot.sendMessage(chatId, createRateMarkup(rate.rate)));
      // // console.log(ratesArray)
      // console.log(sortedRates)
      // // bot.sendMessage(chatId, 'Нашел, еще что-то нужно?', repeatOptions)
      bot.clearTextListeners();

    })
  }

  //

  // bot.on('callback_query', async (msg) => {
  //   const data = msg.data;
  //   const querryId = msg.id
  //   const chatId = msg.message.chat.id; // вынести во вне
  //   console.log(data);
  //   // console.log(chatId);
  //   if (data === 'back') {
  //     bot.sendMessage(chatId, "👋 Привет, что интересует?", mainOptions);
  //   };
  //   if (data === 'getсompany') {
  //     bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
  //     searchCompanyHandler(msg);
  //   };
  //   if (data === 'newquerry') {
  //     bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
  //     searchCompanyHandler(msg);
  //   }
  //   if (data === 'getprice') {
  //     bot.sendMessage(chatId, 'Выбери категорию', rateOptions);
  //     getRatesHandler()
  //   }
  //   if (data === 'newchoice') {
  //     bot.sendMessage(chatId, 'Выбери категорию', rateOptions);
  //     getRatesHandler()
  //   }
  // })



}
