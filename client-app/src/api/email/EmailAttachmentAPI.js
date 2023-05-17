import axiosInstance from '../default-setup/AxiosInstance';

export default {
    downloadAttachment: id => {
        const requestUrl = `email-attachment/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
