import axiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_MUTATION = `project/participant/mutation`;

export default {
    newParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}`;

        return axiosInstance
            .post(requestUrl, participantMutation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${participantMutation.id}`;

        return axiosInstance
            .post(requestUrl, participantMutation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteParticipantMutation: id => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${id}/delete`;

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
