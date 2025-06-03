import client from './client';
import config from '@/lib/config/config';

const dbId = config.notion.dbId;

export async function postNotion(trade, retries = 3) {
    try {
        for (let i = 0; i < retries; i++) {
            try {
                await client.pages.create({
                    parent: { database_id: dbId },
                    properties: trade,
                });
                return true;
            } catch (e) {
                if (e.code === 'conflict_error' && i < retries - 1) {
                    console.log(`! conflict`);
                    await new Promise((r) => setTimeout(r, 500 * (i + 1)));
                    continue;
                }
                throw e;
            }
        }
    } catch (error) {
        throw error;
    }
}
