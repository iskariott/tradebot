import moment from 'moment';
import { formatInstrName, formatNumber } from '../../lib/helper.js';

export function parsePositionData(data) {
    try {
        if (!data) return false;
        let message = '';
        data.forEach((d) => {
            const upl = formatNumber(d.upl, 'upl', 1);
            const ff = formatNumber(d.fundingFee, 'ff', 1);
            const instr = formatInstrName(d.instId);
            message += `${instr}: ${upl} (${ff}) | `;
        });
        console.log('✅ parsePositionData');
        return message;
    } catch (error) {
        error.message = `❌ parsePositionData failed: ${error.message}`;
        throw error;
    }
}

export function parsePriceData(data) {
    const instr = formatInstrName(data.instId);
    const last = formatNumber(data.last, `${instr}.last`);
    const low = formatNumber(data.low24h, `${instr}.low24h`);
    const high = formatNumber(data.high24h, `${instr}.high24h`);
    console.log('✅ parsePriceData');
    return `🟢 ${last} ⬇️ ${low} ⬆️ ${high}`;
}

export function parsePositionHistory(data) {
    const d = data[0];
    return {
        openTime: moment(d.cTime).format('DD.MM.YY HH:mm'),
        closeTime: moment(d.uTime).format('DD.MM.YY HH:mm'),
        openPrice: d.openAvgPx,
        closePrice: d.closeAvgPx,
        lever: d.lever,
        realizedPnl: d.realizedPnl,
        instr: d.uly,
        direction: d.direction,
    };
}
