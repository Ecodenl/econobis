import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    downloadAttachment: id => {
        return getAxiosInstance().get(`email-attachment/${id}/download`, { responseType: 'blob' });
    },
    fetchContacts: id => {
        return getAxiosInstance().get(`email-attachment/${id}/contacts`);
    },

    addDocumentsAsAttachments: (emailId, documentIds) => {
        return getAxiosInstance().post(`email/${emailId}/add-documents-as-attachments`, {
            documentIds,
        });
    },

    delete: id => {
        return getAxiosInstance().post(`email-attachment/${id}/delete`);
    },

    store: (emailId, data) => {
        return getAxiosInstance().post(`email/${emailId}/attachment`, data);
    },
};
