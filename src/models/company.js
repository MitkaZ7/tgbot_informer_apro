import { sequelize } from '../components/database.config.js'
import { DataTypes, Deferrable } from 'sequelize'
import { Rate } from './rate.js'
const Company = sequelize.define('Company',{
  company_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company_name: {
    type: DataTypes.STRING,
   },
  inn: {
    type: DataTypes.BIGINT,
    unique: true,
  },
  kpp: {
    type: DataTypes.BIGINT,
    defaultValue: 0,
  },
  partnership: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  RateRateId: {
    type: DataTypes.INTEGER,
    references: {
      model: Rate,
      key: 'rate_id',
      deferrable: Deferrable.INITIALLY_IMMEDIATE
    }
  },
},
{
  timestamps: false,
}
  )
export { Company }
