import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  itspro: 'КП ПРОФ',
  itsbase: 'КП Базовый',
  clouds: 'Фреш',
  fiscal: 'ОФД'
}

export const searchRate = async (category) => {
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
