import { sequelize } from '../components/database.config.js'
import { DataTypes, Deferrable } from 'sequelize'
import { Company } from './company.js'
import { Rate } from './rate.js'

const COMPANY_RATE_HUB = sequelize.define('COMPANY_RATE_HUB', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company_id:{
    type: DataTypes.INTEGER,
    references: {
      model: Company,
      key: 'company_id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
  rate_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Rate,
      key: 'rate_id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  }
})

export { COMPANY_RATE_HUB }
