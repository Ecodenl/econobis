import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

const URL_REVENUE = `project/revenue`;

export default {
    fetchProjectRevenue: id => {
        const requestUrl = `${URL_REVENUE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProjectRevenue: (id, data) => {
        const requestUrl = `${URL_REVENUE}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProjectRevenueConfirm: (id, data) => {
        const requestUrl = `${URL_REVENUE}/${id}/confirm`;

        return getAxiosInstance().post(requestUrl, data);
    },

    storeProjectRevenue: data => {
        const requestUrl = `${URL_REVENUE}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteProjectRevenue: id => {
        const requestUrl = `${URL_REVENUE}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenueReport: (templateId, emailTemplateId, subject, distributionIds, showOnPortal) => {
        const requestUrl = `${getApiUrl()}/api/distribution/create-revenue-report`;

        return getAxiosInstance().post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionIds: distributionIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    createPaymentInvoices: (datePayout, distributionIds, description) => {
        const requestUrl = `${getApiUrl()}/api/distribution/create-payment-invoices`;

        return getAxiosInstance().post(requestUrl, {
            distributionIds: distributionIds,
            datePayout: datePayout,
            description: description,
        });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution/${id}/preview-pdf`;

        return getAxiosInstance().post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution/${id}/preview-email`;

        return getAxiosInstance().post(requestUrl, {
            subject: subject,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchProjectRevenueDistribution: (id, page) => {
        const requestUrl = `${URL_REVENUE}/${id}/distribution`;

        return getAxiosInstance().post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUE}/${id}/csv`;

        return getAxiosInstance().get(requestUrl);
    },
};
