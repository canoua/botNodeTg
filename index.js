// подключаем модуль Telegraf'а.
const { Telegraf } = require('telegraf');

// Создаём экземпляр класса  Telegraf, 
// в конструктор передаём токен бота, который мы получили у BotFather. 
// Через этот экземпляр будем управлять ботом.
const bot = new Telegraf('7311928508:AAGeGtVffGnP7j-Uc0UKefm__tWCe1_db_Q');

/*
  Middlewares в Telegraf'е похожи на middlewares в Express, 
  то есть это набор функций-обработчиков, 
  через которые проходит апдейт, когда попадает боту. 
  Каждая из этих функций может принимать два параметра: контекст и функцию next.
*/
const middleware1 = (ctx, next) => {
    console.log('middleware1');
    next();
};
const middleware2 = (ctx, next) => {
    console.log('middleware2');
};
const middleware3 = (ctx, next) => {
    console.log('middleware3');
};

bot.use(middleware1);
bot.use(middleware2);
bot.use(middleware3);


/*
  Регистрируем наше middleware — функцию обработчик сообщений. 
  В данном случае оно возвращает ответным сообщением свойство ctx.update, 
  сериализованное в JSON. Свойство update это сообщение, которое прислал боту Telegram. 
  Подробнее о Middlewares и о параметре ctx будет дальше. 
*/
bot.use(async (ctx) => {
    await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

// По умолчанию бот работает в режиме long-polling, 
// то есть сам начинает делать запросы в Bot API, 
// чтобы получить новые сообщения. 
// Функция launch запускает этот процесс и возвращает Promise, 
// когда Promise выполнится, выводим в консоль сообщение, что бот запустился.
bot.launch().then(() => console.log('Started'));

/*
  Далее регистрируем обработчики, 
  которые произведут необходимые операции для остановки бота, 
  в случае если приложение получит сигнал о прекращении работы. 
  Например, если нажмёте Ctrl+C в Терминале в котором запустили бота.
*/
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));