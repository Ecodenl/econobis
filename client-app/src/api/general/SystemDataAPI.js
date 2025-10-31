import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getSystemData() {
        const requestUrl = `${getApiUrl()}/api/system-data`;

        return getAxiosInstance().get(requestUrl);
    },
};
