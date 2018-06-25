import axios from 'axios';

const URL_API = process.env.URL_API;
const URL_REVENUE = `${URL_API}/api/production-project/revenue`;

export default {
    fetchProductionProjectRevenue: (id) => {
        const requestUrl = `${URL_REVENUE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    updateProductionProjectRevenue: (id, data) => {
        const requestUrl = `${URL_REVENUE}/${id}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    storeProductionProjectRevenue: (data) => {
        const requestUrl = `${URL_REVENUE}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, data)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    deleteProductionProjectRevenue: (id) => {
        const requestUrl = `${URL_REVENUE}/${id}/delete`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl)
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    createPaymentInvoices: (templateId, emailTemplateId, subject, distributionIds) => {
        const requestUrl = `${URL_API}/api/distribution/create-payment-invoices`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {documentTemplateId: templateId, emailTemplateId: emailTemplateId, distributionIds: distributionIds, subject: subject})
            .then(response => response)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    createEnergySupplierReport: (revenueId, templateId, energySupplierId, documentName) => {
        const requestUrl = `${URL_REVENUE}/create-energy-supplier-report/${revenueId}/${templateId}/${energySupplierId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {documentName: documentName})
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    createEnergySupplierCsv: (revenueId, templateId, energySupplierId, documentName) => {
        const requestUrl = `${URL_REVENUE}/create-energy-supplier-csv/${revenueId}/${energySupplierId}`;
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios.post(requestUrl, {documentName: documentName, templateId: templateId})
            .then(response => response.data.data)
            .catch((error) => {
                    console.log(error);
                },
            );
    },

    downloadPreview: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `${URL_API}/api/distribution/${id}/download-preview`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, {'subject': subject, 'documentTemplateId' : documentTemplateId,'emailTemplateId' :emailTemplateId}, {responseType: 'blob'});
    },

    previewEmail: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `${URL_API}/api/distribution/${id}/preview-email`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, {'subject': subject, 'documentTemplateId' : documentTemplateId,'emailTemplateId' :emailTemplateId});
    },
};
