import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  itsprof : 'КП ПРОФ',
  itsbase : 'КП Базовый',
  fresh : 'Фреш',
  fnofd : 'ФН и ОФД'
}

export const searchRate = async (rate, period) => {
  let foundedRates = [];
  if (Object.hasOwn(categories), rate){
    const searchValue = categories[rate];
    // console.log(searchValue)
    await Rate.findAll({
      where: {
        title: {
          [Op.substring]: searchValue
        },
        [Op.and]: [
          {month_qty: period}
        ]
      }
    })
      .then(rates => {
        if (!rates) {
          return []
        }
        foundedRates = rates;
      })
  }
  return foundedRates;
}
