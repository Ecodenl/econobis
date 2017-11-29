import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_CONTACT_GROUP = `${URL_API}/api/contact-group`;

export default {
    fetchContactGroups: () => {
        const requestUrl = `${URL_CONTACT_GROUP}/grid`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                console.log(error);
            },
            );
    },

    deleteContactGroup: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },

    fetchGroupsByContact: (contactId) => {
        const requestUrl = `${URL_API}/api/contact/${contactId}/groups`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data)
            .catch((error) => {
                console.log(error);
            },
            );
    },

    addContactToGroup: ({groupId, contactId}) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/add/${contactId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch(error => error.response);
    },

    newContactGroup: (contactGroup) => {
        const requestUrl = `${URL_CONTACT_GROUP}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, contactGroup)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateContactGroup: (person) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${person.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, person)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    fetchContactGroupDetails: (id) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${id}`;
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

    deleteContactFromGroup: (groupId, contactId) => {
        const requestUrl = `${URL_CONTACT_GROUP}/${groupId}/contacts/remove/${contactId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error.response;
            });
    },
};
