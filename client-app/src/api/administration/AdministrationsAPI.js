import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchAdministrations: () => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    peekAdministrations: () => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchTwinfieldInfoAdministrations: () => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/twinfield-info-administrations`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekLedgers: id => {
        const URL_ADMINISTRATION = `${getApiUrl()}/api/administration`;
        const requestUrl = `${URL_ADMINISTRATION}/${id}/ledger/peek`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
