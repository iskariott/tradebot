import { getPositionsHistory } from '@/api/okx';
import { postNotion } from '@/api/notion';
import { parseDataToNotionDB } from '@/services/notion/parseDataToNotionDB';
import { parsePositionHistory } from '@/services/okx/parseApiData';

// import moment from 'moment';
// const before = moment('30.05.2025 00:00', 'DD.MM.YYYY HH:mm').valueOf();
const posData = await getPositionsHistory({ limit: 1 });
const parsedData = parsePositionHistory(posData);

try {
    console.log(`Кількість позицій: ${parsedData.length}`);
    for (let i = 0; i < parsedData.length; i++) {
        await postNotion(parseDataToNotionDB(parsedData[i]));
        console.log(`${i + 1}. ${parsedData[i].ts} додано`);
    }
} catch (error) {
    console.error(error.message);
}
