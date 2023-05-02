import { sequelize } from '../components/database.config.js'
import { DataTypes, Deferrable } from 'sequelize'
import { Company } from './company.js'
const Rate = sequelize.define('Rate',{
  rate_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'RUB'
  },
   order_code: {
    type: DataTypes.BIGINT,
  },
  month_qty: {
    type: DataTypes.INTEGER
  },
  // CompanyCompanyId: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: Company,
  //     key: 'company_id',
  //     deferrable: Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },
},
  {
    updatedAt: 'updated_at',
    createdAt: false,
    timestamps: false,
  })

export { Rate }


