import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newParticipantTransaction: participantTransaction => {
        const URL_PARTICIPANT_TRANSACTION = `${getApiUrl()}/api/project/participant/transaction`;
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}`;

        return getAxiosInstance()
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateParticipantTransaction: participantTransaction => {
        const URL_PARTICIPANT_TRANSACTION = `${getApiUrl()}/api/project/participant/transaction`;
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${participantTransaction.id}`;

        return getAxiosInstance()
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteParticipantTransaction: id => {
        const URL_PARTICIPANT_TRANSACTION = `${getApiUrl()}/api/project/participant/transaction`;
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${id}/delete`;

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
