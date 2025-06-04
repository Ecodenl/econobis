import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getAmountsToCleanup: () => {
        const requestUrl = `${getApiUrl()}/api/cleanup/amounts`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },


    getLastCleanupDates: () => {
        const requestUrl = `${getApiUrl()}/api/cleanup/last-cleanup-dates`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
