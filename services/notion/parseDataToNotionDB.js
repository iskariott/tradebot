export function parseDataToNotionDB(data) {
    return {
        'id': {
            title: [
                {
                    text: { content: data.realizedPnl > 0 ? '🟩' : '🟥' },
                },
            ],
        },
        'OpenDate': {
            rich_text: [
                {
                    text: {
                        content: data.openTime,
                    },
                },
            ],
        },
        'CloseDate': {
            rich_text: [
                {
                    text: {
                        content: data.closeTime,
                    },
                },
            ],
        },
        'Duration': {
            rich_text: [
                {
                    text: {
                        content: data.duration,
                    },
                },
            ],
        },
        'OpenPrice': {
            number: data.openPrice,
        },
        'ClosePrice': {
            number: data.closePrice,
        },
        'Lever': {
            number: data.lever,
        },
        'Pnl': {
            number: data.realizedPnl,
        },
        'Type': {
            multi_select: [{ name: data.direction }],
        },
        'Instr': {
            rich_text: [
                {
                    text: {
                        content: data.instr,
                    },
                },
            ],
        },
        'ts': {
            number: data.ts,
        },
        'Size': {
            number: data.size,
        },
    };
}
