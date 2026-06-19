import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newOccupation: occupation => {
        const URL_OCCUPATION = `${getApiUrl()}/api/occupation`;
        const requestUrl = `${URL_OCCUPATION}`;

        return getAxiosInstance()
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateOccupation: occupation => {
        const URL_OCCUPATION = `${getApiUrl()}/api/occupation`;
        const requestUrl = `${URL_OCCUPATION}/${occupation.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteOccupation: occupation => {
        const URL_OCCUPATION = `${getApiUrl()}/api/occupation`;
        const requestUrl = `${URL_OCCUPATION}/delete`;

        return getAxiosInstance()
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
