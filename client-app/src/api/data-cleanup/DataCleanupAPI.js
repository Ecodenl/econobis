import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

const baseUrl = () => `${getApiUrl()}/api/cleanup`;
const api = () => getAxiosInstance();
const unwrap = res => res.data.data;

const DataCleanupAPI = {
    // GET /api/cleanup/items
    getCleanupItems() {
        return api()
            .get(`${baseUrl()}/items`)
            .then(unwrap);
    },

    // POST /api/cleanup/update-items-all
    updateItemsAll() {
        return api()
            .post(`${baseUrl()}/update-items-all`)
            .then(unwrap);
    },

    // POST /api/cleanup/update-item/{cleanupType}
    updateItem(cleanupType) {
        return api()
            .post(`${baseUrl()}/update-item/${cleanupType}`)
            .then(unwrap);
    },

    // POST /api/cleanup/cleanup-item/{cleanupType}
    executeCleanupItem(cleanupType) {
        return api()
            .post(`${baseUrl()}/cleanup-item/${cleanupType}`)
            .then(unwrap);
    },

    // GET /api/cleanup/contacts
    getCleanupContacts() {
        return api()
            .get(`${baseUrl()}/contacts`)
            .then(unwrap);
    },
};

export default DataCleanupAPI;
