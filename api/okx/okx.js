import { RestClient } from 'okx-api';
import { APIKEY, PASS, SECRETKEY } from '../../lib/constants.js';

const client = new RestClient({
    apiKey: APIKEY,
    apiSecret: SECRETKEY,
    apiPass: PASS,
});

export async function getPositionData(isPositionOpen) {
    try {
        const res = await client.getPositions();
        if (!Array.isArray(res) || !res.length) return false;
        console.log('✅ getPositionData');
        return res;
    } catch (error) {
        error.message = `❌ getPositionData failed: ${error.message}`;
        throw error;
    }
}

export async function getPriceData(instId) {
    try {
        const res = await client.getTicker({ instId });
        if (!Array.isArray(res) || !res.length)
            throw new Error(`Помилка отриманні ціни: ${instId}`);
        console.log(`✅ getPriceData ${instId}`);
        return res[0];
    } catch (error) {
        error.message = `❌ getPriceData ${instId} failed: ${error.message}`;
        throw error;
    }
}

export async function getPositionsHistory() {
    try {
        console.log(`✅ getPositionsHistory`);
        return await client.getPositionsHistory({ limit: 1 });
    } catch (error) {
        error.message = `❌ getPositionsHistory failed: ${error.message}`;
        throw error;
    }
}
