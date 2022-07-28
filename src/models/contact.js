import { sequelize } from '../components/database.config.js'
import { DataTypes, Deferrable } from 'sequelize'
import { Company } from './company.js'

const Contact = sequelize.define('Contact',{
  contact_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  // company_id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: true,
  //   references: {
  //     model: Company,
  //     key: 'company_id',
  //     deferrable: Deferrable.INITIALLY_IMMEDIATE
  //   }
  // },

},
  {
    timestamps: false,
  }
)

export { Contact }

