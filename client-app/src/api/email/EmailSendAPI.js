import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchEmail: id => {
        return getAxiosInstance()
            .get(`${getApiUrl()}/api/email-send/${id}`)
            .then(response => response.data);
    },

    saveConcept: (id, attributes) => {
        return getAxiosInstance()
            .post(`${getApiUrl()}/api/email-send/${id}/save-concept`, attributes)
            .then(response => response.data);
    },

    send: id => {
        return getAxiosInstance().post(`${getApiUrl()}/api/email-send/${id}/send`);
    },
};
