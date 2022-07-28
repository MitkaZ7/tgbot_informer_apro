import { sequelize } from '../components/database.config.js'
import { DataTypes } from 'sequelize'
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  chatId: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'Perry Cox'
  }
},
  {
    timestamps: false,
  })

export { User }
