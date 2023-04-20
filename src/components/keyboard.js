
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

export const mainMenuBtns = [{
  text: 'Узнать цены',
  callback_data: 'getprice'
},
// {
//   text: 'Найти клиента',
//   callback_data: 'getсompany'
// }
];

export const rateMenuBtns = [
  {
    text: 'КП Базовый',
    callback_data: 'its_base'
  },
  {
    text: 'КП ПРОФ',
    callback_data: 'its_prof'
  },
  {
    text: 'Фреш',
    callback_data: 'its_fresh'
  },
  {
    text: 'ФН/ОФД',
    callback_data: 'ofd'
  },
  {
    text: '1С',
    callback_data: 'license'
  },
];
export const retailMenuBtns = [
  {
    text: '15 мес ФН+ОФД',
    callback_data: 'ofd_15'
  },
  {
    text: '36 мес. ФН+ОФД',
    callback_data: 'ofd_36'
  }
]


export const periodMenuBtns = [
    {
      text: '1 мес',
      callback_data: 1
    },
    {
      text: '3 мес',
      callback_data: 3
    },
    {
      text: '6 мес',
      callback_data: 6
    },
    {
      text: '12 мес',
      callback_data: 12
    }
];


export const licenseBtns = [
  {
    text: 'БУХ',
    callback_data: 'bp'
  },
  {
    text: 'ЗУП',
    callback_data: 'zup'
  },
  {
    text: 'Сервер',
    callback_data: 'srv'
  },
  {
    text: 'УНФ/УТ',
    callback_data: 'retail'
  },
  {
    text: 'Рабочие места',
    callback_data: 'additional'
  }
]

// export const mainOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     inline_keyboard: mainKeyboard,
//     one_time_keyboard: true,
//   },
//   parse_mode: 'HTML'
// };

// export const  repeatOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     // one_time_keyboard: true,
//     keyboard: repeatKeyboard
//   },
//   parse_mode: 'HTML'
// }

// export const rateOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     one_time_keyboard: true,
//     inline_keyboard: rateСategoryKeyboard,
//   },
//   parse_mode: 'HTML'
// }

export const itsPeriodOptions = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    inline_keyboard: periodMenuBtns,
  },
  parse_mode: 'HTML'
}

// export const freshPeriodsOptions = {
//   reply_markup: {
//     resize_keyboard: true,
//     inline_keyboard: freshPeriods,
//   }
// }

