import client from './client';

export async function getPositionData() {
    try {
        const res = await client.getPositions();
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
        console.log(`✅ getPriceData ${instId}`);
        return res;
    } catch (error) {
        error.message = `❌ getPriceData ${instId} failed: ${error.message}`;
        throw error;
    }
}

export async function getPositionsHistory(params) {
    try {
        console.log(`✅ getPositionsHistory`);
        return await client.getPositionsHistory(params);
    } catch (error) {
        error.message = `❌ getPositionsHistory failed: ${error.message}`;
        throw error;
    }
}
