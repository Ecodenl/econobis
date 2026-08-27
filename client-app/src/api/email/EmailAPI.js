import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchEmails: ({ folder, filters, sorts, pagination }) => {
        const requestUrl = `${getApiUrl()}/api/email/grid/in-folder/${folder}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchEmail: id => {
        const requestUrl = `${getApiUrl()}/api/email/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailByType: (id, type) => {
        const requestUrl = `${getApiUrl()}/api/email/${id}/${type}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailGroup: id => {
        const requestUrl = `${getApiUrl()}/api/email/group/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    setStatus: (emailId, status) => {
        const requestUrl = `${getApiUrl()}/api/email/${emailId}/status/${status}`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    newConcept: (email, mailbox_id) => {
        const requestUrl = `${getApiUrl()}/api/email/concept/${mailbox_id}/store`;

        return getAxiosInstance().post(requestUrl, email);
    },

    newConcept2: (email, mailbox_id, email_id) => {
        const requestUrl = `${getApiUrl()}/api/email/concept/${mailbox_id}/${email_id}/store2`;

        return getAxiosInstance().post(requestUrl, email);
    },

    newEmail: (email, mailbox_id, email_id) => {
        const requestUrl = `${getApiUrl()}/api/email/send/${mailbox_id}/${email_id}`;

        return getAxiosInstance().post(requestUrl, email);
    },

    downloadAttachment: id => {
        const requestUrl = `${getApiUrl()}/api/email/email-attachment/${id}/download`;

        return getAxiosInstance().get(requestUrl, { responseType: 'blob' });
    },

    storeAttachment: (email_id, data) => {
        const requestUrl = `${getApiUrl()}/api/email/email-attachment/${email_id}/store`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteAttachment: email_attachment_id => {
        const requestUrl = `${getApiUrl()}/api/email/email-attachment/${email_attachment_id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    updateConcept: (email, email_id) => {
        const requestUrl = `${getApiUrl()}/api/email/concept/${email_id}/update`;

        return getAxiosInstance().post(requestUrl, email);
    },

    updateConcept2: (email, email_id) => {
        const requestUrl = `${getApiUrl()}/api/email/concept/${email_id}/update2`;

        return getAxiosInstance().post(requestUrl, email);
    },

    sendConcept: (email, email_id) => {
        const requestUrl = `${getApiUrl()}/api/email/concept/${email_id}/send`;

        return getAxiosInstance().post(requestUrl, email);
    },

    updateEmail: email => {
        const requestUrl = `${getApiUrl()}/api/email/${email.id}`;

        return getAxiosInstance().post(requestUrl, email);
    },

    moveToFolder: (emailId, folder) => {
        const requestUrl = `${getApiUrl()}/api/email/${emailId}/move-to-folder`;

        return getAxiosInstance().post(requestUrl, { folder: folder });
    },

    deleteEmail: emailId => {
        const requestUrl = `${getApiUrl()}/api/email/${emailId}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
