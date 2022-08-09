export default function createCompanyMarkup(companyData) {
  return `
   \nНайден клиент: ✅ \n<b>${companyData.company_name}</b> \n<b>ИНН:</b> <code>${companyData.inn}</code> \n<b>КПП:</b> <code>${companyData.kpp}</code> \n<b>Есть ИТС:</b> ${companyData.partnership}
  `
}
