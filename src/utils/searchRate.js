import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  'КП ПРОФ' : 'КП ПРОФ',
  'КП Базовый': 'КП Базовый',
  fresh : 'Фреш',
  fnofd : 'ФН и ОФД'
}

export const searchRate = async ({rateData}) => {
  const {rate, period} = rateData
  let foundedRates = [];
  await Rate.findAll({
    where: {
      title: {
        [Op.substring]: rate
      },
      [Op.and]: [
        { month_qty: period }
      ]
    }
  })
    .then(rates => {
      if (!rates) {
        console.log('rates not found')
        return []
      }
      foundedRates = rates;
    })
  // if (Object.hasOwn(categories), rate){
  //   const searchValue = categories.rate;
  //   console.log('searchValue: ' + searchValue)

  // }
  return foundedRates;
}
