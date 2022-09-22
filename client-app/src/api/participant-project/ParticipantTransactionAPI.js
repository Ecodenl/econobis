import axiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_TRANSACTION = `${URL_API}/api/project/participant/transaction`;

export default {
    newParticipantTransaction: participantTransaction => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}`;

        return axiosInstance
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateParticipantTransaction: participantTransaction => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${participantTransaction.id}`;

        return axiosInstance
            .post(requestUrl, participantTransaction)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteParticipantTransaction: id => {
        const requestUrl = `${URL_PARTICIPANT_TRANSACTION}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
