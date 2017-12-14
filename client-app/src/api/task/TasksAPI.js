import axios from 'axios';

const URL_API = process.env.URL_API;

export default {
    fetchTasks: ({ filters, sorts }) => {
        const requestUrl = `${URL_API}/api/task/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
            },
        });
    },
};