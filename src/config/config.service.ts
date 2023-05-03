import { DotenvParseOutput, config } from "dotenv";
import { IconfigService } from "./config.interface";

export class ConfigService implements IconfigService {

  private config: DotenvParseOutput;

  constructor(){
    const {error, parsed } = config();
    if (error) {
      throw new Error("Не найден файл .env")
    }
    if (!parsed) {
      throw new Error("пустой файл .env")
    }
    this.config = parsed;
  }

  get(key: string): string {
   const res = this.config[key];
   if (!res) {
    throw new Error("нет такого ключа");
   }
   return res;
  }

}
