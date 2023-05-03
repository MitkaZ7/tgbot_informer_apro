import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
// import { sequelize } from './src/components/database.config.js'
// import { bot } from './src/components/bot.js'
// import User from './src/models/rate.js'

const app: Express = express();
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
async function startApp() {
  try {
    // await sequelize.authenticate();
    // await sequelize.sync();

    console.log('DB Connection has been established successfully.');
    app.listen(process.env.PORT, () => {
      console.log(`Bot server started at port: ${process.env.PORT}`);
    })
    // startBot();
  } catch (error) {
    console.log(error);
    console.log('DB not connected');
  }
}
startApp();
