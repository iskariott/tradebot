// import 'dotenv/config';
import { RestClient } from 'okx-api';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;

const BTCPRICE_CHATID = process.env.BTCPRICE_CHATID;
const PEPEPRICE_CHATID = process.env.PEPEPRICE_CHATID;
const PNL_CHATID = process.env.PNL_CHATID;

const client = new RestClient({
    apiKey: process.env.APIKEY,
    apiSecret: process.env.SECRETKEY,
    apiPass: process.env.PASS,
});

const bot = new TelegramBot(token, { polling: true });

let previousMessages = {
    [BTCPRICE_CHATID]: null,
    [PEPEPRICE_CHATID]: null,
    [PNL_CHATID]: null,
};

function toValidNumber(value, fieldName = '') {
    const num = Number(value);
    if (isNaN(num)) {
        console.error(`${fieldName} - неможливо конвертувати у число ${value}`);
        return -1;
    }
    return num;
}

async function getPositionData() {
    try {
        const res = await client.getPositions();
        const p = res[0];

        const upl = toValidNumber(p.upl, 'upl');
        const ep = toValidNumber(p.avgPx, 'avgPx');
        const ff = toValidNumber(p.fundingFee, 'fundingFee');
        const liq = toValidNumber(p.liqPx, 'liqPx');
        const sl = toValidNumber(p.closeOrderAlgo?.[0]?.slTriggerPx, 'slTriggerPx');
        const tp = toValidNumber(p.closeOrderAlgo?.[0]?.tpTriggerPx, 'tpTriggerPx');
        console.log('getPositionData done ✅');
        return `pl: ${upl} | ep: ${ep} | ff: ${ff.toFixed(
            2,
        )} | liq: ${liq} | sl: ${sl} | tp: ${tp}`;
    } catch (err) {
        console.error('Помилка при отриманні позиції:', err.message);
        return 'Не вдалося отримати позицію.';
    }
}

async function getPriceData(instId) {
    try {
        const res = await client.getTicker({ instId });
        const t = res[0];

        const last = toValidNumber(t.last, `${instId}.last`);
        const low = toValidNumber(t.low24h, `${instId}.low24h`);
        const high = toValidNumber(t.high24h, `${instId}.high24h`);

        console.log('getPriceData done ✅');
        return `🟢 ${last} ⬇️ ${low} ⬆️ ${high}`;
    } catch (err) {
        console.error(`Помилка при отриманні ціни ${instId}:`, err.message);
        return `Не вдалося отримати ціну для ${instId}`;
    }
}

async function sendOrUpdateMessage(chatId, text) {
    try {
        // Видаляємо попереднє повідомлення, якщо є
        if (previousMessages[chatId]) {
            await bot.deleteMessage(chatId, previousMessages[chatId]).catch((err) => {
                if (
                    err.response?.body?.description !== 'Bad Request: message to delete not found'
                ) {
                    console.error(
                        `Помилка при видаленні повідомлення в чаті ${chatId}:`,
                        err.message,
                    );
                }
                console.log('deleteMessage done ✅');
            });
        }

        // Надсилаємо нове повідомлення і зберігаємо його ID
        const sent = await bot.sendMessage(chatId, text);
        previousMessages[chatId] = sent.message_id;
        console.log('sendMessage done ✅');
    } catch (err) {
        console.error(`Помилка при надсиланні повідомлення в чат ${chatId}:`, err.message);
    }
}

setInterval(async () => {
    try {
        const [positionMsg, btcMsg, pepeMsg] = await Promise.all([
            getPositionData(),
            getPriceData('BTC-USDT'),
            getPriceData('PEPE-USDT'),
        ]);

        await Promise.all([
            sendOrUpdateMessage(BTCPRICE_CHATID, btcMsg),
            sendOrUpdateMessage(PEPEPRICE_CHATID, pepeMsg),
            sendOrUpdateMessage(PNL_CHATID, positionMsg),
        ]);
    } catch (error) {
        console.error('Помилка при циклі оновлення:', error.message);
    }
}, 60000);
