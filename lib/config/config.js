import 'dotenv/config';

export default {
    tg: {
        token: process.env.TELEGRAM_BOT_TOKEN,
        chatIds: {
            btc: process.env.BTCPRICE_CHATID,
            pepe: process.env.PEPEPRICE_CHATID,
            pnl: process.env.PNL_CHATID,
            journal: process.env.JOURNAL_CHATID,
        },
    },
    okx: {
        apiKey: process.env.APIKEY,
        secretKey: process.env.SECRETKEY,
        pass: process.env.PASS,
    },
    notion: {
        token: process.env.NOTION_TOKEN,
        dbId: process.env.NOTION_DB_ID,
    },
};
