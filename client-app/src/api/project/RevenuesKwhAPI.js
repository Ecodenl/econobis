import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

const URL_REVENUES_KWH = `project/revenues-kwh`;

export default {
    fetchRevenuesKwh: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchRevenuesKwhForReport: (id, reportType) => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/report/${reportType}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    updateRevenuesKwh: (id, data) => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    recalculateRevenuesDistribution: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/recalculateRevenuesDistribution`;

        return getAxiosInstance().get(requestUrl);
    },

    storeRevenuesKwh: data => {
        const requestUrl = `${URL_REVENUES_KWH}`;

        return getAxiosInstance().post(requestUrl, data);
    },

    deleteRevenuesKwh: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    createRevenuesKwhReport: (templateId, emailTemplateId, subject, distributionKwhIds, showOnPortal) => {
        const requestUrl = `${getApiUrl()}/api/distribution-kwh/create-revenues-kwh-report`;

        return getAxiosInstance().post(requestUrl, {
            documentTemplateId: templateId,
            emailTemplateId: emailTemplateId,
            distributionKwhIds: distributionKwhIds,
            subject: subject,
            showOnPortal: showOnPortal,
        });
    },

    processRevenuesKwh: (datePayout, distributionKwhIds) => {
        const requestUrl = `${getApiUrl()}/api/distribution-kwh/process-revenues-kwh`;

        return getAxiosInstance().post(requestUrl, {
            distributionKwhIds: distributionKwhIds,
            datePayout: datePayout,
        });
    },

    createEnergySupplierReport: (revenueId, templateId, documentName) => {
        const requestUrl = `${URL_REVENUES_KWH}/create-energy-supplier-report/${revenueId}/${templateId}`;

        return getAxiosInstance()
            .post(requestUrl, { documentName: documentName })
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    previewPDF: (id, subject, documentTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/preview-pdf`;

        return getAxiosInstance().post(
            requestUrl,
            { subject: subject, documentTemplateId: documentTemplateId },
            { responseType: 'blob' }
        );
    },

    previewEmail: (id, subject, emailTemplateId) => {
        const requestUrl = `distribution-kwh/${id}/preview-email`;

        return getAxiosInstance().post(requestUrl, {
            subject: subject,
            emailTemplateId: emailTemplateId,
        });
    },

    fetchRevenueDistributionKwh: (id, page) => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/distribution-kwh`;

        return getAxiosInstance().post(requestUrl, { page: page });
    },

    getCSV: id => {
        const requestUrl = `${URL_REVENUES_KWH}/${id}/csv`;

        return getAxiosInstance().get(requestUrl);
    },
};
