import moment from 'moment';
import { formatInstrName, formatNumber } from '@/lib/utils/helper';
import { CT_VAL } from './ctVal';

export function parsePositionData(data) {
    try {
        if (!Array.isArray(data) || !data.length) return false;
        let message = '';
        data.forEach((d) => {
            const upl = formatNumber(d.upl, 1);
            const ff = formatNumber(d.fundingFee, 1);
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
    if (!Array.isArray(data) || !data.length) throw new Error(`Помилка отриманні ціни: ${instId}`);
    const last = formatNumber(data[0].last);
    const low = formatNumber(data[0].low24h);
    const high = formatNumber(data[0].high24h);
    console.log('✅ parsePriceData');
    return `🟢 ${last} ⬇️ ${low} ⬆️ ${high}`;
}

export function parsePositionHistory(data) {
    function calculatePositionSize(openAvgPx, openMaxPos, lever, instId) {
        if (!CT_VAL[instId]) return [];
        const size = (Number(openMaxPos) * CT_VAL[instId] * Number(openAvgPx)) / Number(lever);
        return formatNumber(size, 2);
    }

    return data.map((d) => {
        const durationData = moment.duration(d.uTime - d.cTime);
        const duration = `${durationData.days()}d ${durationData.hours()}h`;
        return {
            openTime: moment(formatNumber(d.cTime)).format('DD.MM.YY HH:mm'),
            closeTime: moment(formatNumber(d.uTime)).format('DD.MM.YY HH:mm'),
            duration,
            openPrice: formatNumber(d.openAvgPx),
            closePrice: formatNumber(d.closeAvgPx),
            lever: formatNumber(d.lever),
            realizedPnl: formatNumber(d.realizedPnl, 2),
            instr: formatInstrName(d.uly),
            direction: d.direction,
            size: calculatePositionSize(d.openAvgPx, d.openMaxPos, d.lever, d.instId),
            ts: formatNumber(d.cTime),
        };
    });
}
