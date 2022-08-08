// export const backKey = {
//   text: '← Назад',
//   callback_data: 'back'
// }
// export const repeatKey = {
//   text: 'Найти еще 🔎',
//   callback_data: 'newquerry'
// }

const repeatKeyboard = [
  [
    {
      text: '← Назад',
      callback_data: 'back'
    },
    {
      text: 'Найти еще 🔎',
      callback_data: 'newquerry'
    }
  ]
]

export const mainKeyboard = [
  [
    {
      text: 'Найти клиента',
      callback_data: 'getсompany'
    },
    {
      text: 'Получить контакты',
      callback_data: 'getcontact'
    }
  ],
  [
    {
      text: 'Узнать цены',
      callback_data: 'getprice'
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

]

export const mainOptions = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    inline_keyboard: mainKeyboard
  },
  parse_mode: 'HTML'
};

export const  repeatOptions = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    inline_keyboard: repeatKeyboard
  },
  parse_mode: 'HTML'
}
