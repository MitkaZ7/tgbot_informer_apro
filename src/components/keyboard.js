import { Keyboard, Key } from 'telegram-keyboard'
export const backKeyboard = Keyboard.make(['Назад'])
export const keyboard = Keyboard.make([
  Key.callback('Вся нформация о клиенте', 'getClientInfo'),
  Key.callback('Узнать контакты','getContacts'),
  Key.callback('Узнать цены на ИТС', 'getPrices'),
  Key.callback('Кто не продлен?', 'getUnsubscribedList')
]).inline()
