import { RestClient } from 'okx-api';
import config from '@/lib/config/config';

const OKX_CONFIG = config.okx;

export default new RestClient({
    apiKey: OKX_CONFIG.apiKey,
    apiSecret: OKX_CONFIG.secretKey,
    apiPass: OKX_CONFIG.pass,
});
