import { Client } from '@notionhq/client';
import config from '@/lib/config/config';

export default new Client({ auth: config.notion.token });
