import { getPositionData, getPriceData } from './api/okx/okx.js';
import { sendMsgToChat } from './api/tg/tg.js';
import { parsePositionData, parsePriceData } from './features/okx/parseApiData.js';
import { BTC_USDT_FUTURES_ID, CHAT_IDS, PEPE_USDT_FUTURES_ID } from './lib/constants.js';

// const isPositionOpen = false;

async function prepareMessagesToSend() {
    const [positionsResp, btcPriceResp, pepePriceResp] = await Promise.all([
        getPositionData(),
        getPriceData(BTC_USDT_FUTURES_ID),
        getPriceData(PEPE_USDT_FUTURES_ID),
    ]);

    // if (!positionsResp) {
    //     if (isPositionOpen) {
    //     }
    //     positionMsg = false;
    // }
    const positionMsg = parsePositionData(positionsResp);
    const btcMsg = parsePriceData(btcPriceResp);
    const pepeMsg = parsePriceData(pepePriceResp);

    return { positionMsg, btcMsg, pepeMsg };
}

async function sendMessagesAndWait() {
    try {
        const { positionMsg, btcMsg, pepeMsg } = await prepareMessagesToSend();
        await Promise.all(
            [
                positionMsg && sendMsgToChat(CHAT_IDS.PNL, positionMsg),
                btcMsg && sendMsgToChat(CHAT_IDS.BTC, btcMsg),
                pepeMsg && sendMsgToChat(CHAT_IDS.PEPE, pepeMsg),
            ].filter(Boolean),
        );
        setTimeout(sendMessagesAndWait, 60000);
    } catch (error) {
        console.error(error);
    }
}

sendMessagesAndWait();
