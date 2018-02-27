import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_PARTICIPANT_PRODUCTION_PROJECT = `${URL_API}/api/production-project/participant`;

export default {
    fetchParticipantsProductionProject: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_PARTICIPANT_PRODUCTION_PROJECT}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },
};
