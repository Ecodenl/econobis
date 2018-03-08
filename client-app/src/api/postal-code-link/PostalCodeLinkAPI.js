import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_POSTAL_CODE_LINK = `${URL_API}/api/postal-code-link`;

export default {
    fetchPostalCodeLinks: () => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newPostalCodeLink: (postalCodeLink) => {
        const requestUrl = URL_POSTAL_CODE_LINK;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, postalCodeLink);
    },

    updatePostalCodeLink: (postalCodeLink) => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${postalCodeLink.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, postalCodeLink);
    },

    deletePostalCodeLink: (id) => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};