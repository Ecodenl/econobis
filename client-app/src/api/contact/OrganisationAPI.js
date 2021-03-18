import axios from 'axios';

const URL_ORGANISATION = `${URL_API}/api/organisation`;

export default {
    newOrganisation: organisation => {
        const requestUrl = `${URL_ORGANISATION}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, organisation);
    },

    updateOrganisation: organisation => {
        const requestUrl = `${URL_ORGANISATION}/${organisation.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, organisation);
    },

    getOrganisationPeek: () => {
        const requestUrl = `${URL_ORGANISATION}/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
