import axiosInstance from '../../default-setup/AxiosInstance';
import axios from 'axios';

const URL_FINANCIAL_OVERVIEW_CONTACT = `financial-overview-contact`;

export default {
    fetchFinancialOverviewContactDetails: financialOverviewContactId => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewContactId}/get`;

        return axiosInstance.get(requestUrl);
    },

    getFinancialOverviewContactsForSending: (financialOverviewId, ids, type) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/sending/${type}`;

        return axiosInstance.post(requestUrl, { ids: ids });
    },

    sendAll: (financialOverviewId, ids) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/send-all`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, { ids: ids }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    sendAllPost: (financialOverviewId, ids) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/send-all-post`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, { ids: ids }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },

    download: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    downloadPreview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}}/download-preview`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    getEmailPreview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/email-preview`;

        return axiosInstance.get(requestUrl);
    },
};
