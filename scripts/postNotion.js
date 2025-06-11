import { getPositionsHistory } from '@/api/okx';
import { postNotion } from '@/api/notion';
import { parseDataToNotionDB } from '@/services/notion/parseDataToNotionDB';
import { parsePositionHistory } from '@/services/okx/parseApiData';

const LIMIT = Number(process.argv[2]);

try {
    if (isNaN(LIMIT)) throw new Error('Position limit invalid');
    const posData = await getPositionsHistory({ limit: LIMIT });
    const parsedData = parsePositionHistory(posData);
    console.log(`Кількість позицій: ${parsedData.length}`);
    for (let i = 0; i < parsedData.length; i++) {
        await postNotion(parseDataToNotionDB(parsedData[i]));
        console.log(`${i + 1}. ${parsedData[i].ts} додано`);
    }
} catch (error) {
    console.error(error.message);
}
