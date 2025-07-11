import axiosInstance from '../default-setup/AxiosInstance';

export default {
    createParticipantProject: function(registerValues) {
        const requestUrl = `/project/participant/create`;

        return axiosInstance.post(requestUrl, { registerValues });
    },
    updateParticipantProject: function(registerValues, registerType, participantId) {
        const requestUrl = `/project/participant/${participantId}/update`;

        return axiosInstance.post(requestUrl, { registerValues, registerType });
    },

    show: id => {
        const requestUrl = `/project/participant/${id}`;

        return axiosInstance.get(requestUrl);
    },

    participantDocumentDownload: function(participantId, id) {
        const requestUrl = `/project/participant/${participantId}/document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
