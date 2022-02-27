const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const config = require('./config.json')
const token = config.TOKEN;

process.env.NTBA_FIX_319 = 1;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(
    token, {
        polling: true,
    }
);

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/teapic/, (msg) => {

    bot.sendPhoto(msg.chat.id, "https://www.pinclipart.com/picdir/big/63-638078_free-stock-chips-drawing-kawaii-transparent-cartoon-tea.png");

});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [
                ["Sample text", "Second sample"],
                ["Keyboard"], ["I'm robot"]]
        }
    });

});

bot.on('message', (msg) => {
    const Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`);
    }
    const bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
    const teacup = "teacup";
    if (msg.text.indexOf(teacup) === 0) {
        bot.sendMessage(msg.chat.id, "teacup is here!");
    }
    const location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id, 44.97108, -104.27719); //Only Telegram Dekstop user can see this picture
        bot.sendMessage(msg.chat.id, "Here is the point");
    }
});

console.log(`Teleram bot is ready!`)