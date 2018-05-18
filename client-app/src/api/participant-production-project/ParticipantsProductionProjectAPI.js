import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PARTICIPANT_PRODUCTION_PROJECT = `${URL_API}/api/production-project/participant`;

export default {
    fetchParticipantsProductionProject: ({ filters, extraFilters, sorts, pagination, productionProjectId }) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                productionProjectId: productionProjectId ? JSON.stringify(productionProjectId) : null,
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
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
};
