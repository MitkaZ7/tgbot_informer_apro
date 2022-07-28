
// import { User } from '../models/user.js'
// import { Company } from '../models/company.js'
// // import { COMPANY_RATE_HUB } from '../models/company_rate_hub.js'
// import { Contact } from '../models/contact.js'
// import { Rate } from '../models/rate.js'

// const bot = new TelegramBot(process.env.TOKEN, { polling: true });

// Rate.hasMany(Company)
// Company.hasMany(Rate)

// // const keyboard = {
// //   reply_to_message_id: msg.message_id,
// //   reply_markup: {
// //     resize_keyboard: true,
// //     one_time_keyboard: true,
// //     keyboard: [['Все о клиенте'], ['Как связаться?', 'Какой тариф?'], ['Есть ли непродленные?']]
// //   }
// // };




// export default function startBot() {
//   bot.on('message', async (msg) => {
//     const text = msg.text;
//     const chatId = msg.chat.id;
//     bot.onText(/^\/start$/, function (msg) {
//       const buttons = {
//         reply_to_message_id: msg.message_id,
//         reply_markup: {
//           resize_keyboard: true,
//           one_time_keyboard: true,
//           keyboard: [['Все о клиенте'], ['Как связаться?', 'Какой тариф?'], ['Есть ли непродленные?']]
//         }
//       };

//       bot.sendMessage(chatId, "👋 Добро пожаловать!", buttons);
//     });



//     try {
//         if (text === '/info') {
//           const user = await User.findOne({ chatId })
//           console.log(user) }
//         if (text === '/add') {
//         await Rate.findOne({ where: { title: 'КП ПРОФ 12 Льготный'}})
//         .then(rate => {
//           if (!rate) {
//             return console.log('rate not found');
//           }

//           conosole.log(rate)
//         })



//       }

//     } catch (error) {

//     }
//   })

// }
