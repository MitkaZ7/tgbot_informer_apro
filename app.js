import 'dotenv/config'
import express from 'express'
import { sequelize } from './src/components/database.config.js'
import startBot from './src/components/bot.js'
// import User from './src/models/rate.js'

const app = express();
app.use(express.json());

async function startApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('DB Connection has been established successfully.');
    app.listen(process.env.PORT, () => {
      console.log(`Bot server started at port: ${process.env.PORT}`);
    })
    await startBot();
  } catch (error) {
    console.log(error);
    console.log('DB not connected');
  }
}
startApp();

