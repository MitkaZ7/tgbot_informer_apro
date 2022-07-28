import { sequelize } from '../components/database.config.js'
import { DataTypes } from 'sequelize'

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
  }
},
{
  timestamps: false,
}
  )
export { Company }
