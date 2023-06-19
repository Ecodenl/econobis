import axiosInstance from '../default-setup/AxiosInstance';

const URL_EMAIL = `${URL_API}/api/email`;

export default {
    fetchEmails: ({ folder, filters, sorts, pagination }) => {
        const requestUrl = `${URL_EMAIL}/grid/in-folder/${folder}`;


        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
    },

    fetchEmail: id => {
        const requestUrl = `${URL_EMAIL}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailByType: (id, type) => {
        const requestUrl = `${URL_EMAIL}/${id}/${type}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchEmailGroup: id => {
        const requestUrl = `${URL_EMAIL}/group/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });
    },

    setStatus: (emailId, status) => {
        const requestUrl = `${URL_EMAIL}/${emailId}/status/${status}`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    newConcept: (email, mailbox_id) => {
        const requestUrl = `${URL_EMAIL}/concept/${mailbox_id}/store`;

        return axiosInstance.post(requestUrl, email);
    },

    newConcept2: (email, mailbox_id, email_id) => {
        const requestUrl = `${URL_EMAIL}/concept/${mailbox_id}/${email_id}/store2`;

        return axiosInstance.post(requestUrl, email);
    },

    newEmail: (email, mailbox_id, email_id) => {
        const requestUrl = `${URL_EMAIL}/send/${mailbox_id}/${email_id}`;

        return axiosInstance.post(requestUrl, email);
    },

    downloadAttachment: id => {
        const requestUrl = `${URL_EMAIL}/email-attachment/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    storeAttachment: (email_id, data) => {
        const requestUrl = `${URL_EMAIL}/email-attachment/${email_id}/store`;

        return axiosInstance.post(requestUrl, data);
    },

    deleteAttachment: email_attachment_id => {
        const requestUrl = `${URL_EMAIL}/email-attachment/${email_attachment_id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    updateConcept: (email, email_id) => {
        const requestUrl = `${URL_EMAIL}/concept/${email_id}/update`;

        return axiosInstance.post(requestUrl, email);
    },

    updateConcept2: (email, email_id) => {
        const requestUrl = `${URL_EMAIL}/concept/${email_id}/update2`;

        return axiosInstance.post(requestUrl, email);
    },

    sendConcept: (email, email_id) => {
        const requestUrl = `${URL_EMAIL}/concept/${email_id}/send`;

        return axiosInstance.post(requestUrl, email);
    },

    updateEmail: email => {
        const requestUrl = `${URL_EMAIL}/${email.id}`;

        return axiosInstance.post(requestUrl, email);
    },

    moveToFolder: (emailId, folder) => {
        const requestUrl = `${URL_EMAIL}/${emailId}/move-to-folder`;

        return axiosInstance.post(requestUrl, { folder: folder });
    },

    deleteEmail: emailId => {
        const requestUrl = `${URL_EMAIL}/${emailId}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
