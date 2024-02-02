import axiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_PROJECT = `project/participant`;

export default {
    fetchParticipantProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}`;

        if (id === undefined) return null;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateParticipantProject: (id, data) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeParticipantProject: data => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}`;

        return axiosInstance.post(requestUrl, data);
    },

    transferParticipation: data => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/transfer`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteParticipantProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    getContactsMembershipPeek: participantId => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${participantId}/peek-members`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    terminateParticipantProject: (id, payload) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/terminate`;

        return axiosInstance.post(requestUrl, payload);
    },
    terminateParticipantProjectObligation: (id, payload) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/terminate-obligation`;

        return axiosInstance.post(requestUrl, payload);
    },
    undoTerminateParticipantProject: (id, payload) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/undo-terminate`;

        return axiosInstance.post(requestUrl, payload);
    },
};
