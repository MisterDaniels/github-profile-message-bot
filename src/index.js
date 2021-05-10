require('dotenv').config({
    path: require('find-config')('.env')
});

const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');

const { AdaptiveCardsBot } = require('./bots/adaptiveCardsBot');

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_SECRET
});

adapter.onTurnError = async (context, error) => {
    console.error(`⚡️[BOT]: ${ error }`);

    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    await context.sendActivity('The bot is with errors. Please, fix those problems to run this bot properly.');
};

const bot = new AdaptiveCardsBot();

const server = restify.createServer();
server.listen(process.env.PORT || 3978, function() {
    console.log(`⚡️[BOT]: listening to ${ server.url }`);
});

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await bot.run(context);
    });
});