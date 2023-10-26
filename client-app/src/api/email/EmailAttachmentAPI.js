import axiosInstance from '../default-setup/AxiosInstance';

export default {
    downloadAttachment: id => {
        return axiosInstance.get(`email-attachment/${id}/download`, { responseType: 'blob' });
    },

    addDocumentsAsAttachments: (emailId, documentIds) => {
        return axiosInstance.post(`email/${emailId}/add-documents-as-attachments`, {
            documentIds
        });
    },

    delete: id => {
        return axiosInstance.post(`email-attachment/${id}/delete`);
    },

    store: (emailId, data) => {
        return axiosInstance.post(`email/${emailId}/attachment`, data);
    },
};
