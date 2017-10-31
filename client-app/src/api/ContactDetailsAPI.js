import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_TYPE = `${URL_API}/api/contact`;

export default {
    getContactDetails: (id) => {
        const requestUrl = `${URL_TYPE}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
};