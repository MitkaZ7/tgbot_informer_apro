import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  'prof' : 'КП ПРОФ',
  'base': 'КП Базовый',
  'fresh' : 'Фреш',
  'ofd' : 'ФН и ОФД',
  'license': '1С'
}
const splitSearchData = (data) => {
  console.log('data is: ' + data)
  const dataToSearch = {
    rate: null,
    period: null,
  }
  if (data.startsWith('its')) {
    console.log('starts with its');
    const splitedData = data.split('_');
    dataToSearch.rate = splitedData[1];
    dataToSearch.period = splitedData[2];

  } else {
    console.log('not starts with its')
    // console.log(dataToSearch)
    dataToSearch.rate = splitedData[0];
    console.log(dataToSearch)
    // dataToSearch.period = 0;
  }
  return dataToSearch;
}

export const searchRate = async (callBackData) => {
  let foundedRates = [];
  const splited = callBackData.split('_');
  const  rateData = {
    rate: null,
    period: null,
    searchValue: null,
  }
  if (callBackData.startsWith('its')) {
    rateData.rate = splited[1];
    rateData.period = splited[2];
  } else if (callBackData.startsWith('ofd')){
    rateData.rate = splited[0];
    rateData.period = splited[1];
  }
  // console.log('rate is ' + rate)
  if (Object.hasOwn(categories), rateData.rate) {
    rateData.searchValue = categories[rateData.rate];
    console.log('searchValue ' + rateData.searchValue);
    if (rateData.searchValue === 'ФН и ОФД' || rateData.searchValue === '1С') {
      await Rate.findAll({
        where: {
          title: {
            [Op.substring]: rateData.searchValue
          }
        }
      })
        .then(rates => {
          if (!rates) {
            console.log('rates not found')
            return []
          } else {
            foundedRates = rates;
          }
        })
    } else {
    await Rate.findAll({
      where: {
        title: {
          [Op.substring]: rateData.searchValue
        },
        [Op.and]: [
          { month_qty: rateData.period }
        ]
      }
    })
      .then(rates => {
        if (!rates) {
          console.log('rates not found')
          return []
        } else {
          foundedRates = rates;
        }

      })
    }
  }

  return foundedRates;
}
