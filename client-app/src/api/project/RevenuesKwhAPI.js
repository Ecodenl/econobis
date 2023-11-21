import axiosInstance from '../default-setup/AxiosInstance';

const URL_REVENUES_KWH = `project/revenues-kwh`;

export default {
    fetchRevenuesKwh: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateRevenuesKwh: (id, data) => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    recalculateRevenuesDistribution: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/recalculateRevenuesDistribution`;

        return axiosInstance.get(requestUrl);
    },

    storeRevenuesKwh: data => {
        const requestUrl = `${URL_REVENUES_KWH}`;

        return axiosInstance.post(requestUrl, data);
    },

    deleteRevenuesKwh: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenuesKwhReport: (templateId, emailTemplateId, subject, distributionKwhIds, showOnPortal) => {
        const requestUrl = `${URL_API}/api/distribution-kwh/create-revenues-kwh-report`;

        return axiosInstance.post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionKwhIds: distributionKwhIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    processRevenuesKwh: (datePayout, distributionKwhIds) => {
        const requestUrl = `${URL_API}/api/distribution-kwh/process-revenues-kwh`;

        return axiosInstance.post(requestUrl, {
            distributionKwhIds: distributionKwhIds,
            datePayout: datePayout,
        });
    },

    createEnergySupplierReport: (revenueId, templateId, documentName) => {
        const requestUrl = `${URL_REVENUES_KWH}/create-energy-supplier-report/${revenueId}/${templateId}`;

        return axiosInstance
            .post(requestUrl, { documentName: documentName })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/preview-pdf`;

        return axiosInstance.post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/preview-email`;

        return axiosInstance.post(requestUrl, {
            subject: subject,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchRevenueDistributionKwh: (id, page) => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/distribution-kwh`;

        return axiosInstance.post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/csv`;

        return axiosInstance.get(requestUrl);
    },
};
