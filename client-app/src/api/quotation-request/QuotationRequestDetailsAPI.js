import axiosInstance from '../default-setup/AxiosInstance';

const URL_QUOTATION_REQUEST = `${URL_API}/api/quotation-request`;

export default {
    fetchQuotationRequestDetails: function(id) {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchNewQuotationRequest: (opportunityId, opportunityActionId) => {
        const requestUrl = `${URL_API}/api/opportunity/${opportunityId}/${opportunityActionId}/quotation-request`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newQuotationRequest: quotationRequest => {
        const requestUrl = `${URL_QUOTATION_REQUEST}`;

        return axiosInstance.post(requestUrl, quotationRequest).then(function(response) {
            return response.data;
        });
        // .catch(function(error) {
        //     console.log(error);
        // });
    },

    updateQuotationRequest: quotationRequest => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${quotationRequest.id}/update`;

        return axiosInstance
            .post(requestUrl, quotationRequest)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteQuotationRequest: id => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    deleteBulkQuotationRequests: ids => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/bulk-delete`;

        return axiosInstance.post(requestUrl, { ids: ids });
    },

    updateBulkQuotationRequests: (ids, values) => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/bulk-update`;

        return axiosInstance.post(requestUrl, { ids: ids, ...values });
    },
};
