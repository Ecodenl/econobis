import axiosInstance from '../default-setup/AxiosInstance';

const URL_REVENUE_PARTS_KWH = `project/revenue-parts-kwh`;
const URL_REVENUE_PARTS_KWH_FOR_REPORT = `project/revenue-parts-kwh-for-report`;

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

    fetchRevenuePartsKwhForReport: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH_FOR_REPORT}/${id}`;

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

    createRevenuePartsKwhReport: (templateId, emailTemplateId, subject, distributionPartsKwhIds, showOnPortal) => {
        const requestUrl = `${URL_API}/api/distribution-part-kwh/create-revenue-parts-kwh-report`;

        return axiosInstance.post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionPartsKwhIds: distributionPartsKwhIds,
            subject: subject,
            showOnPortal: showOnPortal,
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

    createEnergySupplierExcel: (revenuePartId, documentName) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/create-energy-supplier-excel/${revenuePartId}`;
        return axiosInstance
            .post(requestUrl, { documentName: documentName })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/preview-pdf`;

        return axiosInstance.post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/preview-email`;

        return axiosInstance.post(requestUrl, {
            subject: subject,
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
