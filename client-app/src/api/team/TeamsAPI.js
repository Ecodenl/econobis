import axios from 'axios';

const URL_TEAM = `${URL_API}/api/team`;

export default {
    fetchTeams: () => {
        const requestUrl = `${URL_TEAM}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    deleteTeam: (id) => {
        const requestUrl = `${URL_TEAM}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};