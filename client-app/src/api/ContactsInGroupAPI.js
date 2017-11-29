import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactsInGroup: (contactGroup) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                console.log(error);
            },
            );
    },

    deleteContactInGroup: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${contactGroup}/contacts/remove/${contact}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },
};
