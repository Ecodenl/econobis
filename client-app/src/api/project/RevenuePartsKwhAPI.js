import axiosInstance from '../default-setup/AxiosInstance';

const URL_REVENUE_PARTS_KWH = `project/revenue-parts-kwh`;

export default {
    fetchRevenuePartsKwh: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateRevenuePartsKwh: (id, data) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeRevenuePartsKwh: data => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}`;

        return axiosInstance.post(requestUrl, data);
    },

    deleteRevenuePartsKwh: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenuePartsKwhReport: (templateId, emailTemplateId, subject, distributionPartsKwhIds) => {
        const requestUrl = `${URL_API}/api/distribution-part-kwh/create-revenue-parts-kwh-report`;

        return axiosInstance.post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionPartsKwhIds: distributionPartsKwhIds,
            subject: subject,
        });
    },

    processRevenuePartsKwh: (partsId, datePayout, distributionPartsKwhIds) => {
        const requestUrl = `${URL_API}/api/distribution-part-kwh/process-revenue-parts-kwh`;

        return axiosInstance.post(requestUrl, {
            partsId: partsId,
            distributionPartsKwhIds: distributionPartsKwhIds,
            datePayout: datePayout,
        });
    },

    createEnergySupplierExcel: (revenuePartId, energySupplierId, documentName, distributionPartsKwhIds) => {
        let requestUrl = '';
        if (energySupplierId == 0) {
            requestUrl = `${URL_REVENUE_PARTS_KWH}/create-energy-supplier-excel/${revenuePartId}`;
        } else {
            requestUrl = `${URL_REVENUE_PARTS_KWH}/create-energy-supplier-excel/${revenuePartId}/${energySupplierId}`;
        }
        return axiosInstance
            .post(requestUrl, { documentName: documentName, distributionPartsKwhIds: distributionPartsKwhIds })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    downloadPreview: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/download-preview`;

        return axiosInstance.post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId, emailTemplateId: emailTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, documentTemplateId, emailTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/preview-email`;

        return axiosInstance.post(requestUrl, {
            subject: subject,
            documentTemplateId: documentTemplateId,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchRevenueDistributionPartsKwh: (id, page) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/distribution-parts-kwh`;

        return axiosInstance.post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/csv`;

        return axiosInstance.get(requestUrl);
    },
};
