import TelegramBot from 'node-telegram-bot-api';
import { CHAT_IDS_TO_NAME, TOKEN } from '../../lib/constants.js';

const BOT = new TelegramBot(TOKEN, { polling: true });

export async function sendMsgToChat(chatId, msg) {
    try {
        await BOT.sendMessage(chatId, msg);
        console.log(`✅ sendMsgToChat ${CHAT_IDS_TO_NAME[chatId]}`);
    } catch (error) {
        error.message = `❌ sendMsgToChat ${CHAT_IDS_TO_NAME[chatId]} failed: ${error.message}`;
        throw error;
    }
}

export async function getChatId() {
    BOT.on('message', (msg) => {
        console.log('👁 chat info:', {
            chatId: msg.chat.id,
            title: msg.chat.title,
            username: msg.chat.username,
            type: msg.chat.type,
        });
    });
}
