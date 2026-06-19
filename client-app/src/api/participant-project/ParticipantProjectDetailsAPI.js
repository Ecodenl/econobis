import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_PROJECT = `project/participant`;

export default {
    fetchParticipantProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}`;

        if (id === undefined) return null;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateParticipantProject: (id, data) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeParticipantProject: data => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    transferParticipation: data => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/transfer`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteParticipantProject: id => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    getContactsMembershipPeek: participantId => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${participantId}/peek-members`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getAdditionalInfoForTerminatingOrChangeEntryDate: participantId => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${participantId}/additional-info-for-terminating-or-change-entry-date`;

        return getAxiosInstance()
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

        return getAxiosInstance().post(requestUrl, payload);
    },
    terminateParticipantProjectLoanOrObligation: (id, payload) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/terminate-loan-or-obligation`;

        return getAxiosInstance().post(requestUrl, payload);
    },
    undoTerminateParticipantProject: (id, payload) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/${id}/undo-terminate`;

        return getAxiosInstance().post(requestUrl, payload);
    },
};
