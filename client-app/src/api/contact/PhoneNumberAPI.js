import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newPhoneNumber: phoneNumber => {
        const URL_PHONE_NUMBER = `${getApiUrl()}/api/phone-number`;
        const requestUrl = `${URL_PHONE_NUMBER}`;

        return getAxiosInstance()
            .post(requestUrl, phoneNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updatePhoneNumber: phoneNumber => {
        const URL_PHONE_NUMBER = `${getApiUrl()}/api/phone-number`;
        const requestUrl = `${URL_PHONE_NUMBER}/${phoneNumber.id}`;

        return getAxiosInstance()
            .post(requestUrl, phoneNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deletePhoneNumber: id => {
        const URL_PHONE_NUMBER = `${getApiUrl()}/api/phone-number`;
        const requestUrl = `${URL_PHONE_NUMBER}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
