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

    getCleanupYears: () => {
        const requestUrl = `${getApiUrl()}/api/cleanup/cleanup-years`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getExcludedGroups: (cleanupType) => {
        const requestUrl = `${getApiUrl()}/api/cleanup/cleanup-items/`+cleanupType;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    cleanupItems: (cleanupType) => {
        const requestUrl = `${getApiUrl()}/api/cleanup/cleanup-items/`+cleanupType;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
