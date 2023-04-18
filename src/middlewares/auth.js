import { Op } from 'sequelize'
import { User } from '../models/user.js'
// import { bot } from '../components/bot.js'
export default async function auth (userId){
  const foundedId = await User.findOne({
    where: {
      tg_id: {
        [Op.eq]: userId
      }
    }
  })
  // .then(user => {
  //   if(!user) {
  //     return false
  //   }

  //   return true
  //   // return user.dataValues.tg_id
  // })
  // console.log(foundedId)
  return foundedId;
}
