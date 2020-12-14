import axiosInstance from '../../default-setup/AxiosInstance';
import axios from 'axios';

const URL_FINANCIAL_OVERVIEW_CONTACT = `financial-overview-contact`;

export default {
    fetchFinancialOverviewContactDetails: (financialOverviewId, contactId) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/${contactId}/get`;

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
    // sendAll: financialOverviewContactIds => {
    //     const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/send-all`;
    //     const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
    //     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //
    //     document.body.style.cursor = 'wait';
    //     let response = axios.post(requestUrl, { ids: financialOverviewContactIds }, { responseType: 'blob' });
    //     document.body.style.cursor = 'default';
    //     return response;
    // },

    sendAllPost: (financialOverviewId, ids) => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${financialOverviewId}/send-all-post`;

        document.body.style.cursor = 'wait';
        let response = axiosInstance.post(requestUrl, { ids: ids }, { responseType: 'blob' });
        document.body.style.cursor = 'default';
        return response;
    },
    // sendAllPost: financialOverviewContactIds => {
    //     const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/send-all-post`;
    //     const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
    //     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //
    //     document.body.style.cursor = 'wait';
    //     let response = axios.post(requestUrl, { ids: financialOverviewContactIds }, { responseType: 'blob' });
    //     document.body.style.cursor = 'default';
    //     return response;
    // },

    //
    // download: id => {
    //     const requestUrl = `${URL_API}/api/${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/download`;
    //     const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
    //     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    //
    //     return axios.get(requestUrl, { responseType: 'blob' });
    // },
    download: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },

    getEmailPreview: id => {
        const requestUrl = `${URL_FINANCIAL_OVERVIEW_CONTACT}/${id}/email-preview`;

        return axiosInstance.get(requestUrl);
    },
};
