import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchVersion: () => {
        const URL_VERSION = `${getApiUrl()}/client-version`;
        return getAxiosInstance().get(URL_VERSION);
    },
};
