import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newObligationNumber: obligationNumber => {
        const URL_OBLIGATION_NUMBER = `${getApiUrl()}/api/project/participant/obligation-number`;
        const requestUrl = `${URL_OBLIGATION_NUMBER}`;

        return getAxiosInstance()
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateObligationNumber: obligationNumber => {
        const URL_OBLIGATION_NUMBER = `${getApiUrl()}/api/project/participant/obligation-number`;
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${obligationNumber.id}`;

        return getAxiosInstance()
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteObligationNumber: id => {
        const URL_OBLIGATION_NUMBER = `${getApiUrl()}/api/project/participant/obligation-number`;
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${id}/delete`;

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
