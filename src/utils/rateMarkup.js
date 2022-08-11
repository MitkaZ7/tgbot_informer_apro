export default function createRateMarkup(rateData) {
  return `
  \nТариф: \n✅<b>${rateData.title}</b> \n🤑<b>Цена:</b> ${rateData.price} \n⏰<b>Месяцев:</b> ${rateData.month_qty} \n<b>Код заказа:</b> <code>${rateData.order_code}</code>
  `
}
