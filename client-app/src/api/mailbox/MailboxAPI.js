import axiosInstance from '../default-setup/AxiosInstance';

const URL_MAILBOX = 'mailbox';

export default {
    fetchMailboxes: () => {
        const requestUrl = `${URL_MAILBOX}/grid`;

        return axiosInstance.get(requestUrl);
    },

    fetchMailboxesLoggedInUser: () => {
        const requestUrl = `${URL_MAILBOX}/logged-in/statuses`;

        return axiosInstance.get(requestUrl);
    },

    fetchMailboxDetails: id => {
        const requestUrl = `${URL_MAILBOX}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    newMailbox: mailbox => {
        const requestUrl = URL_MAILBOX;

        return axiosInstance.post(requestUrl, mailbox);
    },

    updateMailbox: mailbox => {
        const requestUrl = `${URL_MAILBOX}/${mailbox.id}`;

        return axiosInstance.post(requestUrl, mailbox);
    },

    deleteMailbox: id => {
        const requestUrl = `${URL_MAILBOX}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    newMailboxUser: ({ mailboxId, userId }) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/add/${userId}`;

        return axiosInstance.post(requestUrl);
    },

    deleteMailboxUser: ({ mailboxId, userId }) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/remove/${userId}`;

        return axiosInstance.post(requestUrl);
    },

    checkRefreshEmailData: () => {
        const requestUrl = `${URL_MAILBOX}/check-refresh-email-data`;

        return axiosInstance.get(requestUrl);
    },

    fetchMailboxesLoggedInUserPeek: () => {
        const requestUrl = `${URL_MAILBOX}/logged-in/email-peek`;

        return axiosInstance.get(requestUrl);
    },

    fetchMailboxesForUserPeek: userId => {
        const requestUrl = `${URL_MAILBOX}/for-user/${userId}/email-peek`;

        return axiosInstance.get(requestUrl);
    },

    receiveMailFromMailboxesUser: () => {
        const requestUrl = `${URL_MAILBOX}/receive/from-mailboxes-user`;

        return axiosInstance.get(requestUrl);
    },

    newIgnore: ignore => {
        const requestUrl = `${URL_MAILBOX}/ignore`;

        return axiosInstance.post(requestUrl, ignore);
    },

    peekMailboxes: () => {
        const requestUrl = `${URL_MAILBOX}/peek`;

        return axiosInstance.get(requestUrl);
    },

    updateIgnore: ignore => {
        const requestUrl = `${URL_MAILBOX}/update-ignore/${ignore.id}`;

        return axiosInstance.post(requestUrl, ignore);
    },

    deleteIgnore: ignoreId => {
        const requestUrl = `${URL_MAILBOX}/delete-ignore/${ignoreId}`;

        return axiosInstance.post(requestUrl);
    },
};
