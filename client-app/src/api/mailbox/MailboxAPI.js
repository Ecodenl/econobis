import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_MAILBOX = 'mailbox';

export default {
    fetchMailboxes: ({onlyActive}) => {
        const requestUrl = `${URL_MAILBOX}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                onlyActive: onlyActive,
            },
        });
    },

    fetchMailboxesLoggedInUser: () => {
        const requestUrl = `${URL_MAILBOX}/logged-in/only-active`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchMailboxDetails: id => {
        const requestUrl = `${URL_MAILBOX}/${id}`;

        return getAxiosInstance().get(requestUrl);
    },

    newMailbox: mailbox => {
        const requestUrl = URL_MAILBOX;

        return getAxiosInstance().post(requestUrl, mailbox);
    },

    updateMailbox: mailbox => {
        const requestUrl = `${URL_MAILBOX}/${mailbox.id}`;

        return getAxiosInstance().post(requestUrl, mailbox);
    },

    deleteMailbox: id => {
        const requestUrl = `${URL_MAILBOX}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    newMailboxUser: ({ mailboxId, userId }) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/add/${userId}`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteMailboxUser: ({ mailboxId, userId }) => {
        const requestUrl = `${URL_MAILBOX}/${mailboxId}/users/remove/${userId}`;

        return getAxiosInstance().post(requestUrl);
    },

    fetchMailboxesLoggedInUserPeek: () => {
        const requestUrl = `${URL_MAILBOX}/logged-in/email-peek`;

        return getAxiosInstance().get(requestUrl);
    },

    fetchMailboxesForUserPeek: userId => {
        const requestUrl = `${URL_MAILBOX}/for-user/${userId}/email-peek`;

        return getAxiosInstance().get(requestUrl);
    },

    receiveMailFromMailboxesUser: () => {
        const requestUrl = `${URL_MAILBOX}/receive/from-mailboxes-user`;

        return getAxiosInstance().get(requestUrl);
    },

    newIgnore: ignore => {
        const requestUrl = `${URL_MAILBOX}/ignore`;

        return getAxiosInstance().post(requestUrl, ignore);
    },

    peekMailboxes: () => {
        const requestUrl = `${URL_MAILBOX}/peek`;

        return getAxiosInstance().get(requestUrl);
    },

    updateIgnore: ignore => {
        const requestUrl = `${URL_MAILBOX}/update-ignore/${ignore.id}`;

        return getAxiosInstance().post(requestUrl, ignore);
    },

    deleteIgnore: ignoreId => {
        const requestUrl = `${URL_MAILBOX}/delete-ignore/${ignoreId}`;

        return getAxiosInstance().post(requestUrl);
    },
};
