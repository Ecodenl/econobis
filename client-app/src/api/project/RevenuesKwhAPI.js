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

    createRevenuesKwhReport: (templateId, emailTemplateId, subject, distributionKwhIds) => {
        const requestUrl = `${URL_API}/api/distribution-kwh/create-revenues-kwh-report`;

        return axiosInstance.post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionKwhIds: distributionKwhIds,
            subject: subject,
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

    createEnergySupplierExcel: (revenueId, energySupplierId, documentName, distributionKwhIds) => {
        let requestUrl = '';
        if (energySupplierId == 0) {
            requestUrl = `${URL_REVENUES_KWH}/create-energy-supplier-excel/${revenueId}`;
        } else {
            requestUrl = `${URL_REVENUES_KWH}/create-energy-supplier-excel/${revenueId}/${energySupplierId}`;
        }
        return axiosInstance
            .post(requestUrl, { documentName: documentName, distributionKwhIds: distributionKwhIds })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    downloadPreview: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/download-preview`;

        return axiosInstance.post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId, emailTemplateId: emailTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/preview-email`;

        return axiosInstance.post(requestUrl, {
            subject: subject,
            documentTemplateId: documentTemplateId,
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