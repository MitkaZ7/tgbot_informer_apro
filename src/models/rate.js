import { sequelize } from '../components/database.config.js'
import { DataTypes } from 'sequelize'


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
    type: DataTypes.INTEGER,
  },
  month_qty: {
    type: DataTypes.INTEGER
  },
},
  {
    updatedAt: 'updated_at',
    createdAt: false
  })

export { Rate }


