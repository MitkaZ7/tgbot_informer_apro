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
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id; //
    console.log(msg.from.id)
    if (text === '/start') {

      bot.sendMessage(chatId, "👋 Привет, что интересует?", mainOptions);
    }
  });

  function searchCompanyHandler(msg) {
    bot.onText(/.*/, async (msg) => {
      const chatId = msg.chat.id; // вынести во вне
      await searchCompany(msg)
        .then((company) => {
          if (company) {
            bot.sendMessage(chatId, createCompanyMarkup(company), repeatOptions);
            bot.clearTextListeners();
          } else {
            bot.clearTextListeners();
            bot.sendMessage(chatId, 'Такого клиента у нас нет. ❌', repeatOptions)
          }
        })
    });
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

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const querryId = msg.id
    const chatId = msg.message.chat.id; // вынести во вне
    console.log(data);
    // console.log(chatId);
    if (data === 'back') {
      bot.sendMessage(chatId, "👋 Привет, что интересует?", mainOptions);
    };
    if (data === 'getсompany') {
      bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
      searchCompanyHandler(msg);
    };
    if (data === 'newquerry') {
      bot.sendMessage(chatId, 'Пришли название клиента в свободной форме');
      searchCompanyHandler(msg);
    }
    if (data === 'getprice') {
      bot.sendMessage(chatId, 'Выбери категорию', rateOptions);
      getRatesHandler()
    }
    if (data === 'newchoice') {
      bot.sendMessage(chatId, 'Выбери категорию', rateOptions);
      getRatesHandler()
    }
  })



}
