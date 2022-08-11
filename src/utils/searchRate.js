import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  'ИТС ПРОФ' : 'КП ПРОФ',
  'ИТС БАЗОВЫЙ': 'КП Базовый',
  'ИТС ФРЕШ': 'Фреш',
  'ФН и ОФД': 'ФН и ОФД'
}

export const searchRate = async (rate, period) => {
  let foundedRates = [];
  if (Object.hasOwn(categories), category){
    const searchValue = categories[category];
    console.log(searchValue)
    await Rate.findAll({
      where: {
        title: {
          [Op.substring]: searchValue
        }
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
