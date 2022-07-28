await Rate.create({ title: 'КП ПРОФ 12 Льготный', price: '33816', order_code: 161, month_qty: 12 })
await Rate.create({ title: 'КП ПРОФ 8+4', price: '22544', order_code: 162, month_qty: 12 })
await Rate.create({ title: 'КП ПРОФ 12 Стандартный', price: '40572', order_code: 161, month_qty: 12 })
await Rate.create({ title: 'КП ПРОФ 24 Льготный', price: '60869', order_code: 161, month_qty: 24 })

await Rate.create({ title: 'КП ПРОФ 6 Льготный', price: '17869', order_code: 161, month_qty: 6 })
await Rate.create({ title: 'КП ПРОФ 6 Стандартный', price: '21440', order_code: 161, month_qty: 6 })

await Rate.create({ title: 'КП ПРОФ 3 Льготный', price: '9894', order_code: 161, month_qty: 3 })
await Rate.create({ title: 'КП ПРОФ 3 Стандартный', price: '11871', order_code: 161, month_qty: 3 })

await Rate.create({ title: 'КП ПРОФ 1 Льготный', price: '33816', order_code: 161, month_qty: 1 })
await Rate.create({ title: 'КП ПРОФ 1 Стандартный', price: '4577', order_code: 161, month_qty: 1 })

await Rate.create({ title: 'КП Базовый 12 Льготный', price: '14280', order_code: 160, month_qty: 12 })
await Rate.create({ title: 'КП Базовый 12 Стандартный', price: '17136', order_code: 160, month_qty: 12 })

await Rate.create({ title: 'КП Базовый 6 Льготный', price: '7547', order_code: 160, month_qty: 6 })
await Rate.create({ title: 'КП Базовый 6 Стандартный', price: '9055', order_code: 160, month_qty: 6 })

await Rate.create({ title: 'КП Базовый 3 Льготный', price: '4179', order_code: 160, month_qty: 3 })
await Rate.create({ title: 'КП Базовый 3 Стандартный', price: '5013', order_code: 160, month_qty: 3 })

await Rate.create({ title: 'КП Базовый 1 Льготный', price: '1933', order_code: 160, month_qty: 1 })
await Rate.create({ title: 'КП Базовый 1 Стандартный', price: '2319', order_code: 160, month_qty: 1 })


await Company.create({ company_name: 'Олешко Р.Г. ИП', inn: 230110446963, kpp: 0, partnership: true })
await Company.create({ company_name: 'Спецстройфундамент ООО', inn: 2312258640, kpp: 231201001, partnership: true })
await Company.create({ company_name: 'Гарант-Строй ООО', inn: 2301059114, kpp: 312301001, partnership: true })
await Company.create({ company_name: 'Константинополь АПФ', inn: 2301005729, kpp: 2301005729, partnership: true })
await Company.create({ company_name: 'Агата ДСОЛ', inn: 2301012765, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Верхотуров А.Ю. ИП', inn: 230105354202, kpp: 0, partnership: true })
await Company.create({ company_name: 'Сибирцева Е.М. ИП', inn: 230105619106, kpp: 0, partnership: true })
await Company.create({ company_name: 'ВОА Анапа', inn: 2301003513, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Уберс ООО', inn: 7724344873, kpp: 772401001, partnership: true })

await Company.create({ company_name: 'Южное гостеприимство-2 ООО', inn: 2301067154, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Альфа ООО', inn: 2301058230, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'ИнвестГрупп-Энерджи', inn: 7724654924, kpp: 230401001, partnership: true })
await Company.create({ company_name: 'Балтия Отель Менеджмент ООО', inn: 7802726086, kpp: 780201001, partnership: true })
await Company.create({ company_name: 'Вымпел ООО', inn: 2301055173, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Овагимьян С.С ИП', inn: 230111511767, kpp: 0, partnership: true })
await Company.create({ company_name: 'Мирошниченко Д.В. ИП', inn: 230106829466, kpp: 0, partnership: true })
await Company.create({ company_name: 'Гостагай ООО', inn: 2301015974, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'АФ Гостагай ООО', inn: 2301052888, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'ФРОЙДА-Ф ООО', inn: 2301094944, kpp: 237201001, partnership: true })
await Company.create({ company_name: 'Аквапарк ООО', inn: 2301034462, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Тукан ООО', inn: 2301081938, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Олимпия ООО', inn: 2301079294, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Халаджан А.С. ИП', inn: 10517284700, kpp: 0, partnership: true })
await Company.create({ company_name: 'Возрождение ООО', inn: 2301060286, kpp: 230101001, partnership: true })
await Company.create({ company_name: 'Энергосервис групп ООО', inn: 5047236473, kpp: 504701001, partnership: true })
await Company.create({ company_name: 'Дэнсет групп ООО', inn: 7727217880, kpp: 772501001, partnership: true })

await Company.create({ company_name: 'БСТ ООО', inn: 5044125817, kpp: 504401001, partnership: true })
await Company.create({ company_name: 'Профстрой ООО', inn: 2311219913, kpp: 230801001, partnership: true })
await Company.create({ company_name: 'Аллмасс ООО', inn: 2312171830, kpp: 235201001, partnership: true })

await Company.create({ company_name: 'Нью-оптика ООО', inn: 7712101883, kpp: 774301001, partnership: true })
await Company.create({ company_name: 'Горпроект АО', inn: 7722276177, kpp: 773501001, partnership: true })
await Company.create({ company_name: 'Промышленные технологии ООО', inn: 7734704691, kpp: 773401001, partnership: true })
