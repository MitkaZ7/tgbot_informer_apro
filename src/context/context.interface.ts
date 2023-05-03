import { Context} from 'telegraf'

export interface SessionData {
  getprice:Boolean,
  getcompany:Boolean,
  selectedRate:String,
  selectedPeriod:Number,
}

export interface IBotContext extends Context {
  session: SessionData;
}
