import client from './client';

export async function sendMsgToChat(chatId, msg) {
    try {
        await client.sendMessage(chatId, msg);
        console.log(`✅ sendMsgToChat ${chatId}`);
    } catch (error) {
        error.message = `❌ sendMsgToChat: msg ${msg}, chatId ${chatId}`;
        throw error;
    }
}
