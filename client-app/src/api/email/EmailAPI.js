import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_EMAIL = `${URL_API}/api/email`;

export default {
    fetchEmails: (folder) => {
        const requestUrl = `${URL_EMAIL}/grid/in-folder/${folder}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, folder);
    },

    fetchEmail: (id) => {
        const requestUrl = `${URL_EMAIL}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    associateContact: (emailId, contactId) => {
        const requestUrl = `${URL_EMAIL}/${emailId}/${contactId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    newEmail: (email, mailbox_id) => {
        const requestUrl = `${URL_EMAIL}/send/${mailbox_id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, email);
    },

    newConcept: (email, mailbox_id) => {
        const requestUrl = `${URL_EMAIL}/store-concept/${mailbox_id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, email);
    },

    downloadAttachment: (id) => {
        const requestUrl = `${URL_EMAIL}/email-attachment/${id}/download`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl, {responseType: 'blob'});
    },

};

