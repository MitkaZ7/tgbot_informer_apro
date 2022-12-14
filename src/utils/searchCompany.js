import { Company } from '../models/company.js'
import { Op } from 'sequelize'

export const searchCompany = async (msg) => {
  const text = msg.text;
  const foundedCompany = await Company.findOne({
    // where:
    // sequelize.where(
    //   sequelize.fn('lower', sequelize.col('company_name')),
    //   sequelize.fn('lower', text)
    // )
    where: {
      company_name: {
        [Op.substring]: text
      }
    }
  })
    .then(company => {
      if (!company) {
        return null
      }
      const { company_name, inn, kpp, partnership } = company.dataValues
      return { company_name, inn, kpp, partnership }
    })
  return foundedCompany;
};
