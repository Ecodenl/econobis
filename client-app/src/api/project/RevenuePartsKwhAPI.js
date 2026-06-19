import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

const URL_REVENUE_PARTS_KWH = `project/revenue-parts-kwh`;
const URL_REVENUE_PARTS_KWH_FOR_REPORT = `project/revenue-parts-kwh-for-report`;

export default {
    fetchRevenuePartsKwh: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchRevenuePartsKwhForReport: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH_FOR_REPORT}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateRevenuePartsKwh: (id, data) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeRevenuePartsKwh: data => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteRevenuePartsKwh: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenuePartsKwhReport: (templateId, emailTemplateId, subject, distributionPartsKwhIds, showOnPortal) => {
        const requestUrl = `${getApiUrl()}/api/distribution-part-kwh/create-revenue-parts-kwh-report`;

        return getAxiosInstance().post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionPartsKwhIds: distributionPartsKwhIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    processRevenuePartsKwh: (partsId, datePayout, distributionPartsKwhIds) => {
        const requestUrl = `${getApiUrl()}/api/distribution-part-kwh/process-revenue-parts-kwh`;

        return getAxiosInstance().post(requestUrl, {
            partsId: partsId,
            distributionPartsKwhIds: distributionPartsKwhIds,
            datePayout: datePayout,
        });
    },

    createEnergySupplierExcel: (revenuePartId, documentName) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/create-energy-supplier-excel/${revenuePartId}`;
        return getAxiosInstance()
            .post(requestUrl, { documentName: documentName })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/preview-pdf`;

        return getAxiosInstance().post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution-part-kwh/${id}/preview-email`;

        return getAxiosInstance().post(requestUrl, {
            subject: subject,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchRevenueDistributionPartsKwh: (id, page) => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/distribution-parts-kwh`;

        return getAxiosInstance().post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUE_PARTS_KWH}/${id}/csv`;

        return getAxiosInstance().get(requestUrl);
    },
};
