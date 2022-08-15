
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
    // {
      // text: 'Получить контакты',
      // callback_data: 'getcontact'
    // }
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
      callback_data: 'itsprof'
    }
  ],
  [
    {
      text: 'ИТС ФРЕШ',
      callback_data: 'fresh'
    },
    {
      text: 'ФН и ОФД',
      callback_data: 'fnofd'
    }
  ],
  [
    {
      text: 'Назад',
      callback_data: 'back'
    }
  ]

]
const itsPeriodKeyboard = [
  [
    {
      text: '1 мес',
      callback_data: 1
    },
    {
      text: '3 мес',
      callback_data: 3
    }
  ],
  [
    {
      text: '6 мес',
      callback_data: 6
    },
    {
      text: '12 мес',
      callback_data: 12
    }
  ],
  [
    {
      text: 'Другой тариф',
      callback_data: 'newchoice'
    }
  ],
  [  {
      text: 'меню',
      callback_data: 'mainmenu'
    }
  ]
]
const freshPeriods = [
  [
    {
      text: '6 мес',
      callback_data: 6
    },
    {
      text: '12 мес',
      callback_data: 12
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

export const itsPeriodOptions = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: itsPeriodKeyboard,
  },
  parse_mode: 'HTML'
}

export const freshPeriodsOptions = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: freshPeriods,
  }
}

