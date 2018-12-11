import axios from 'axios';

export default {
    fetchAuditTrail: ({ filters, sorts, pagination }) => {
        const requestUrl = `${URL_API}/api/audit-trail/grid`;
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

    fetchAuditTrailModels: () => {
        const requestUrl = `${URL_API}/api/audit-trail/peek-models`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },
};