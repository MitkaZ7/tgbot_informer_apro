import { Rate } from '../models/rate.js'
import { Op } from 'sequelize'
const categories = {
  'prof' : 'КП ПРОФ',
  'base': 'КП Базовый',
  'fresh' : 'Фреш',
  'ofd' : 'ФН и ОФД',
  'license': '1C'
}
const splitSearchData = (data) => {
  console.log('data is: ' + data)
  const dataObj = {
    rate: null,
    period: null,
  }
  const dataArr = data.split('_');
  dataObj.rate = dataArr[1];
  dataObj.period = dataArr[2];
  console.log('dataObj: ' + dataObj)

  return dataObj;
}

export const searchRate =  (rateData) => {
  // rateData = 'pits_base_12'
  const arr = splitSearchData(rateData);
  console.log('arr is: ' + arr)

  //====
  const { rate, period } = arr
  console.log('rate is ' + rate)
  // let foundedRates = [];
  // await Rate.findAll({
  //   where: {
  //     title: {
  //       [Op.substring]: rate
  //     },
  //     [Op.and]: [
  //       { month_qty: period }
  //     ]
  //   }
  // })
  //   .then(rates => {
  //     if (!rates) {
  //       console.log('rates not found')
  //       return []
  //     }
  //     foundedRates = rates;
  //   })
    //==========
  if (Object.hasOwn(categories), rate){
    const searchValue = categories[rate];
    console.log('searchValue: ' + searchValue)

  }
  return arr;
}
