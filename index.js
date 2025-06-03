import { getPositionData, getPriceData } from './api/okx';
import { sendMsgToChat } from './api/tg';
import { parsePositionData, parsePriceData } from './services/okx/parseApiData';
import config from './lib/config/config';

const TG_CHATS = config.tg.chatIds;

async function prepareMessagesToSend() {
    const [positionsResp, btcPriceResp, pepePriceResp] = await Promise.all([
        getPositionData(),
        getPriceData('BTC-USDT-SWAP'),
        getPriceData('PEPE-USDT-SWAP'),
    ]);

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
                positionMsg && sendMsgToChat(TG_CHATS.pnl, positionMsg),
                btcMsg && sendMsgToChat(TG_CHATS.btc, btcMsg),
                pepeMsg && sendMsgToChat(TG_CHATS.pepe, pepeMsg),
            ].filter(Boolean),
        );
        setTimeout(sendMessagesAndWait, 60000);
    } catch (error) {
        console.error(error);
    }
}

sendMessagesAndWait();
