
const repeatKeyboard = [
  [
    {
      text: 'Назад',
      callback_data: 'back'
    },
    {
      text: 'Найти еще',
      callback_data: 'newquerry'
    }
  ]
]

const mainKeyboard = [
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
const rateСategoryKeyboard = [
  [
    {
      text: 'ИТС БАЗОВЫЙ',
      callback_data: 'itsbase'
    },
    {
      text: 'ИТС ПРОФ',
      callback_data: 'itspro'
    }
  ],
  [
    {
      text: 'ИТС ФРЕШ',
      callback_data: 'clouds'
    },
    {
      text: 'ФН и ОФД',
      callback_data: 'fiscal'
    }
  ],

]
const periodKeyboard = [
  [
    {
      text: '1 мес',
      callback_data: 'one'
    },
    {
      text: '3 мес',
      callback_data: 'three'
    }
  ],
  [
    {
      text: '6 мес',
      callback_data: 'six'
    },
    {
      text: '12 мес',
      callback_data: 'twelve'
    }
  ],
  [
    {
      text: 'Перевыбрать тариф',
      callback_data: 'newchoice'
    },
    {
      text: 'Выйти в главное меню',
      callback_data: 'mainmenu'
    }
  ]
]

export const mainOptions = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: mainKeyboard,
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

export const rateOptions = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    inline_keyboard: rateСategoryKeyboard,
  },
  parse_mode: 'HTML'
}

export const periodOptions = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: periodKeyboard,
  },
  parse_mode: 'HTML'
}
