export default function createRateMarkup(rateData) {
  return `
  ✅${rateData.title} \n🤑Цена: ${rateData.price} \n⏰ Месяцев: ${rateData.month_qty}
  `
}
