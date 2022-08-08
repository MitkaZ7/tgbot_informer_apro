export default function createCompanyMarkup(companyData) {
  return `
   <b>Клиент:</b> ${companyData.company_name} \n<b>ИНН:</b> <code>${companyData.inn}</code> \n<b>КПП:</b> <code>${companyData.kpp}</code> \n<b>Есть ИТС:</b> ${companyData.partnership}
  `
}
