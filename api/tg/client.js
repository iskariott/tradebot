import TelegramBot from 'node-telegram-bot-api';
import config from '@/lib/config/config';

export default new TelegramBot(config.tg.token, { polling: true });
