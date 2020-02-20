import axiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_PROJECT = `project/participant`;

export default {
    fetchParticipantsProject: ({ filters, extraFilters, sorts, pagination, filterType, fetchFromProject }) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                filterType: filterType,
                fetchFromProject: fetchFromProject,
            },
        });
    },

    getExcel: (filters, extraFilters, sorts, pagination, fetchFromProject) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/excel`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                fetchFromProject: fetchFromProject,
            },
            responseType: 'blob',
        });
    },

    peekParticipantsProjects: () => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    createParticipantReport: (templateId, emailTemplateId, subject, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/create-participant-report/${templateId}/${emailTemplateId}`;

        return axiosInstance.post(requestUrl, { participantIds: participantIds, subject: subject });
        // todo cleanup
        // .then(response => response.data.data)
        // .catch(error => {
        //     console.log(error);
        // });
    },

    previewPDF: (templateId, emailTemplateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/preview-pdf/${templateId}/${emailTemplateId}`;

        return axiosInstance.post(requestUrl, { participantIds: [participantIds] }, { responseType: 'blob' });
    },

    previewEmail: (templateId, emailTemplateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/preview-email/${templateId}/${emailTemplateId}`;

        return axiosInstance
            .post(requestUrl, { participantIds: [participantIds] })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    saveAsGroup: ({ filters, extraFilters, filterType, saveFromProject }) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/save-as-group`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
                saveFromProject: saveFromProject,
            },
        });
    },
};
