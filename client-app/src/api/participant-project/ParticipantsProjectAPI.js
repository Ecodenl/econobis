import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PARTICIPANT_PROJECT = `project/participant`;

export default {
    fetchParticipantsProject: ({ filters, extraFilters, sorts, pagination, filterType, fetchFromProject }) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/grid`;

        return getAxiosInstance().get(requestUrl, {
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

    getExcel: (filters, extraFilters, sorts, pagination, fetchFromProject, filterProjectId) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/excel`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                fetchFromProject: fetchFromProject,
                filterProjectId: filterProjectId,
            },
            responseType: 'blob',
        });
    },

    getExcelParticipants: (filters, extraFilters, sorts, pagination, fetchFromProject, filterProjectId) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/excelParticipants`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                fetchFromProject: fetchFromProject,
                filterProjectId: filterProjectId,
            },
            responseType: 'blob',
        });
    },

    peekParticipantsProjects: () => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    createParticipantReport: (templateId, emailTemplateId, subject, participantIds, showOnPortal) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/create-participant-report/${
            templateId ? templateId : 'no-pdf'
        }/${emailTemplateId}`;

        return getAxiosInstance().post(requestUrl, {
            participantIds: participantIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    previewPDF: (templateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/preview-pdf/${templateId}`;

        return getAxiosInstance().post(requestUrl, { participantIds: [participantIds] }, { responseType: 'blob' });
    },

    previewEmail: (emailTemplateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/preview-email/${emailTemplateId}`;

        return getAxiosInstance()
            .post(requestUrl, { participantIds: [participantIds] })
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    saveAsGroup: ({ filters, extraFilters, filterType, saveFromProject }) => {
        const requestUrl = `${URL_PARTICIPANT_PROJECT}/save-as-group`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
                saveFromProject: saveFromProject,
            },
        });
    },
};
