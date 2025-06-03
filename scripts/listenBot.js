import client from '@/api/tg/client';

(async () => {
    const handler = (msg) => {
        console.log('👁 chat info:', {
            chatId: msg.chat.id,
            title: msg.chat.title,
            username: msg.chat.username,
            type: msg.chat.type,
        });

        client.off('message', handler); // Видаляємо слухача
        process.exit(0); // Завершуємо програму
    };

    client.on('message', handler);
})();
