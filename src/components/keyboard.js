// import { Keyboard, Key } from 'telegram-keyboard'
const backKey = {
  text:'Назад'
}
// export const keyboard = Keyboard.make([
//   Key.callback('Вся нформация о клиенте', 'getClientInfo'),
//   Key.callback('Узнать контакты','getContacts'),
//   Key.callback('Узнать цены на ИТС', 'getPrices'),
//   Key.callback('Кто не продлен?', 'getUnsubscribedList')
// ]).inline()
export const mainKeyboard = [
  [
    {
      text: 'Найти клиента',
      callback_data: 'getCompany'
    },
    {
      text: 'Получить контакты',
      callback_data: 'getContacnts'
    }
  ],
  [
    {
      text: 'Узнать цены',
      callback_data: 'getPrice'
    }
  ]
  ,
]
export const rateKeyboard = [
  [
    {
      text: 'КП Базовый',
      callback_data: ''
    },
    {
      text: 'КП ПРОФ',
      callback_data: ''
    }
  ],
  [
    {
      text: 'FRESH',
      callback_data: ''
    },
    {
      text: 'ФН и ОФД',
      callback_data: ''
    }
  ],
  [
  backKey
  ]



]
