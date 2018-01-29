import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_MAILBOX = `${URL_API}/api/mailbox`;

export default {
    fetchMailboxes: () => {
        const requestUrl = `${URL_MAILBOX}/grid`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    fetchMailboxDetails: (id) => {
        const requestUrl = `${URL_MAILBOX}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newMailbox: (mailbox) => {
        const requestUrl = URL_MAILBOX;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, mailbox);
    },

    updateMailbox: (mailbox) => {
        const requestUrl = `${URL_MAILBOX}/${mailbox.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, mailbox);
    },

    deleteMailbox: (id) => {
        const requestUrl = `${URL_MAILBOX}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    newMailboxUser: ({mailboxId, userId}) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/add/${userId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteMailboxUser: ({mailboxId, userId}) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/remove/${userId}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    fetchEmailsLoggedInUserPeek: () => {
        const requestUrl = `${URL_MAILBOX}/logged-in/email-peek`;
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

    receiveMailFromMailboxesUser: () => {
        const requestUrl = `${URL_MAILBOX}/receive/from-mailboxes-user`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },
};