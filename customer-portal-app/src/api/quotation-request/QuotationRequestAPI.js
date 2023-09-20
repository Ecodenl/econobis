import axiosInstance from '../default-setup/AxiosInstance';

// eslint-disable-next-line
export default {
    fetchAll: function(campaignId = null) {
        return axiosInstance.get('me/quotation-request', {
            params: {
                campaignId: campaignId,
            },
        });
    },

    fetchById: function(id) {
        return axiosInstance.get('quotation-request/' + id);
    },

    fetchDocumentenById: function(id) {
        return axiosInstance.get('quotation-request/' + id + '/documenten');
    },

    fetchAllQuotationRequestStatus: function() {
        const requestUrl = `jory/quotation-request-status`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'codeRef', 'opportunityActionId', 'opportunityActionName', 'order'],
                    sorts: ['opportunityActionId', 'order'],
                },
            },
        });
    },

    fetchQuotationRequestStatus: function(opportunityActionId) {
        const requestUrl = `jory/quotation-request-status`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'codeRef', 'opportunityActionId', 'order'],
                    flt: {
                        f: 'opportunityActionId',
                        d: opportunityActionId,
                    },
                    sorts: ['order'],
                },
            },
        });
    },

    update: function(quotationRequest) {
        return axiosInstance.post('quotation-request/' + quotationRequest.id, quotationRequest);
    },

    addUploads: function(quotationRequestId, uploads) {
        return axiosInstance.post('quotation-request/' + quotationRequestId + '/uploads', uploads);
    },

    quotationRequestDeleteDocument: function(quotationRequestId, id) {
        return axiosInstance.get('quotation-request/' + quotationRequestId + '/document/' + id + '/delete');
    },

    quotationRequestDownloadDocument: function(quotationRequestId, id) {
        const requestUrl = `quotation-request/${quotationRequestId}/document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
