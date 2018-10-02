import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PARTICIPANT_PRODUCTION_PROJECT = `${URL_API}/api/production-project/participant`;

export default {
    fetchParticipantsProductionProject: ({ filters, extraFilters, sorts, pagination, filterType, fetchFromProductionProject }) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
                filterType: filterType,
                fetchFromProductionProject: fetchFromProductionProject
            },
        });
    },

    getCsv: (filters, extraFilters, sorts, fetchFromProductionProject) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/csv`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                fetchFromProductionProject: fetchFromProductionProject
            },
        });
    },

    peekParticipantsProductionProjects: () => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    createParticipantReport: (templateId, emailTemplateId, subject, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/create-participant-report/${templateId}/${emailTemplateId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {participantIds: participantIds, subject: subject})
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    previewPDF: (templateId, emailTemplateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/preview-pdf/${templateId}/${emailTemplateId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {participantIds: [participantIds]}, {responseType: 'blob'});

    },

    previewEmail: (templateId, emailTemplateId, participantIds) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/preview-email/${templateId}/${emailTemplateId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {participantIds: [participantIds]})
            .then(response => response.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    saveAsGroup: ({ filters, extraFilters, filterType, saveFromProductionProject }) => {
        const requestUrl = `${URL_API}/api/production-project/participant/save-as-group`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                filterType: filterType,
                saveFromProductionProject: saveFromProductionProject,
            },
        });
    },
};
