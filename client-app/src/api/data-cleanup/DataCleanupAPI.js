import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    updateAmounts: cleanupType => {
        const requestUrl = `${getApiUrl()}/api/cleanup/update-amounts/${cleanupType}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getCleanupItems: netContacts => {
        const requestUrl = `${getApiUrl()}/api/cleanup/items`;

        return getAxiosInstance()
            .get(
                requestUrl
                // , {
                //     params: {
                //         netContacts: netContacts,
                //     },
                // }
            )
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    getExcludedGroups: () => {
        const requestUrl = `${getApiUrl()}/api/cleanup/excluded-groups`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteExcludedGroup: groupId => {
        const requestUrl = `${getApiUrl()}/api/cleanup/excluded-groups/delete/` + groupId;
        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    addExcludedGroup: groupId => {
        const requestUrl = `${getApiUrl()}/api/cleanup/excluded-groups/add/` + groupId;
        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateCleanupItem: (cleanupItemId, payload) => {
        const requestUrl = `${getApiUrl()}/api/cleanup/item/${cleanupItemId}`;

        return getAxiosInstance().post(requestUrl, payload);
    },
};
