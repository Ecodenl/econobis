import axiosInstance from '../default-setup/AxiosInstance';

const URL_REVENUE = `project/revenue`;

export default {
    fetchProjectRevenue: id => {
        const requestUrl = `${URL_REVENUE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateProjectRevenue: (id, data) => {
        const requestUrl = `${URL_REVENUE}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProjectRevenue: data => {
        const requestUrl = `${URL_REVENUE}`;

        return axiosInstance.post(requestUrl, data);
    },

    deleteProjectRevenue: id => {
        const requestUrl = `${URL_REVENUE}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenueReport: (templateId, emailTemplateId, subject, distributionIds, showOnPortal) => {
        const requestUrl = `${URL_API}/api/distribution/create-revenue-report`;

        return axiosInstance.post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionIds: distributionIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    createPaymentInvoices: (datePayout, distributionIds, description) => {
        const requestUrl = `${URL_API}/api/distribution/create-payment-invoices`;

        return axiosInstance.post(requestUrl, {
            distributionIds: distributionIds,
            datePayout: datePayout,
            description: description,
        });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution/${id}/preview-pdf`;

        return axiosInstance.post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution/${id}/preview-email`;

        return axiosInstance.post(requestUrl, {
            subject: subject,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchProjectRevenueDistribution: (id, page) => {
        const requestUrl = `${URL_REVENUE}/${id}/distribution`;

        return axiosInstance.post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUE}/${id}/csv`;

        return axiosInstance.get(requestUrl);
    },
};
