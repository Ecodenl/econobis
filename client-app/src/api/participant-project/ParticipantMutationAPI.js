import axiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_MUTATION = `project/participant/mutation`;

export default {
    newParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}`;

        return axiosInstance.post(requestUrl, participantMutation);
    },

    updateParticipantMutation: participantMutation => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${participantMutation.id}`;

        return axiosInstance.post(requestUrl, participantMutation);
    },

    deleteParticipantMutation: id => {
        const requestUrl = `${URL_PARTICIPANT_MUTATION}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
