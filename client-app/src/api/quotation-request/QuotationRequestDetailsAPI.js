import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchQuotationRequestDetails: function(id) {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchNewQuotationRequest: (opportunityId, opportunityActionId) => {
        const requestUrl = `${getApiUrl()}/api/opportunity/${opportunityId}/${opportunityActionId}/quotation-request`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    showUpdateOpportunityStatus: quotationRequest => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/${quotationRequest.id}/show-update-opportunity-status`;

        return getAxiosInstance()
            .post(requestUrl, quotationRequest)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newQuotationRequest: quotationRequest => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}`;

        return getAxiosInstance()
            .post(requestUrl, quotationRequest)
            .then(function(response) {
                return response.data;
            });
        // .catch(function(error) {
        //     console.log(error);
        // });
    },

    updateQuotationRequest: quotationRequest => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/${quotationRequest.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, quotationRequest)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteQuotationRequest: id => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteBulkQuotationRequests: ids => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/bulk-delete`;

        return getAxiosInstance().post(requestUrl, { ids: ids });
    },

    updateBulkQuotationRequests: (ids, values) => {
        const URL_QUOTATION_REQUEST = `${getApiUrl()}/api/quotation-request`;
        const requestUrl = `${URL_QUOTATION_REQUEST}/bulk-update`;

        return getAxiosInstance().post(requestUrl, { ids: ids, ...values });
    },
};
