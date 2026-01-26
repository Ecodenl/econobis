import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getCleanupItems: netContacts => {
        const requestUrl = `${getApiUrl()}/api/cleanup/items`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateItems: cleanupType => {
        const requestUrl = `${getApiUrl()}/api/cleanup/update-items/${cleanupType}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    executeCleanupItems: cleanupType => {
        const requestUrl = `${getApiUrl()}/api/cleanup/cleanup-items/${cleanupType}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getCleanupContacts: netContacts => {
        const requestUrl = `${getApiUrl()}/api/cleanup/contacts`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },
};
