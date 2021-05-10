const { ActivityHandler, CardFactory } = require('botbuilder');

const LinkCard = require('../resources/LinkCard.json');

const WELCOME_TEXT = 'Olá, para saber mais sobre mim, digita algo aí!';

class AdaptiveCardsBot extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; cnt++) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(WELCOME_TEXT);
                }
            }

            await next();
        });

        this.onMessage(async (context, next) => {
            await context.sendActivity({
                text: 'Talk is cheap, está aqui meu código fonte:',
                attachments: [CardFactory.adaptiveCard(LinkCard)]
            });

            await next();
        });
    }
}

module.exports.AdaptiveCardsBot = AdaptiveCardsBot;