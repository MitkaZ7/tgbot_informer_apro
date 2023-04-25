
const repeatKeyboard = [
  [
    {
      text: 'Другой тариф',
      callback_data: 'getprice'
    },
  ],
  [
    {
      text: 'Найти клиента',
      callback_data: 'getсompany'
    }
  ]
]
const backKey = {
  text: '⟸ назад',
  callback_data: 'back'
}

export const mainKeyboard = [
  [
    {
      text: 'Узнать цены',
      callback_data: 'getprice'
    },
    {
      text: 'Найти клиента',
      callback_data: 'getсompany'
    }
  ],
  [
    // {
    //   text: 'Заказать ИТС',
    //   callback_data: 'getсompany'
    // }
  ]
];

export const rateKeyboard = [
  [
    {
      text: '🫴🏻КП Базовый',
      callback_data: 'its_base'
    },
    {
      text: '🤑КП ПРОФ',
      callback_data: 'its_prof'
    },
    {
      text: '🍊Фреш',
      callback_data: 'its_fresh'
    },
  ],
  [
    {
      text: '👮🏻‍♀️ФН/ОФД',
      callback_data: 'ofd'
    },
    {
      text: '🤪1С',
      callback_data: 'license'
    },
  ],
  [backKey]
];
export const retailKeyboard = [
  [
    {
      text: '15 мес ФН+ОФД',
      callback_data: 'ofd_15'
    },
    {
      text: '36 мес. ФН+ОФД',
      callback_data: 'ofd_36'
    }
  ],
  // [
  //   {
  //     text: 'Атол 55Ф',
  //     callback_data: 'atol55'
  //   },
  //   {
  //     text: 'Атол 20Ф',
  //     callback_data: 'atol20'
  //   }
  // ]
  [backKey]
]


export const periodKeyboard = [
  [
    {
      text: '1 мес',
      callback_data: 1
    },
    {
      text: '3 мес',
      callback_data: 3
    },
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
    backKey,
    {
      text: '24 мес',
      callback_data: 24
    }
  ]
];


export const licenseKeyboard = [
  [
    {
      text: '🧮БУХ',
      callback_data: 'bp'
    },
    {
      text: '✉️ЗУП',
      callback_data: 'zup'
    },
    {
      text: '📇Сервер',
      callback_data: 'srv'
    },
  ],
  [
    {
      text: '🛒УНФ/УТ',
      callback_data: 'retail'
    },
    {
      text: '🪑Рабочие места',
      callback_data: 'additional'
    }
  ],
  [backKey]
]
export const mainOptions = {
  reply_markup: {

    inline_keyboard: mainKeyboard,
  },
  parse_mode: 'HTML'
};


// export const  repeatOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     // one_time_keyboard: true,
//     keyboard: repeatKeyboard
//   },
//   parse_mode: 'HTML'
// }

export const rateOptions = {
    inline_keyboard: rateKeyboard,
    resize_keyboard: true,
    one_time_keyboard: true,
}

export const itsPeriodOptions = {
  resize_keyboard: true,
  one_time_keyboard: true,
  inline_keyboard: periodKeyboard,
  parse_mode: 'HTML'
}

// export const freshPeriodsOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     inline_keyboard: freshPeriods,
//   }
// }
export const retailOptions = {
  resize_keyboard: true,
  one_time_keyboard: true,
  inline_keyboard: retailKeyboard,
  parse_mode: 'HTML'
}

export const licenseOptions = {
  resize_keyboard: true,
  one_time_keyboard: true,
  inline_keyboard: licenseKeyboard,
  parse_mode: 'HTML'
}

export const repeatMain = {
  resize_keyboard: true,
  one_time_keyboard: true,
  inline_keyboard: mainKeyboard,
  parse_mode: 'HTML'
}
