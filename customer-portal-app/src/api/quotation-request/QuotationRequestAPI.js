import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchAll: function() {
        return axiosInstance.get('me/quotation-request');
    },

    fetchById: function(id) {
        return axiosInstance.get('quotation-request/' + id);
    },

    update: function(quotationRequest) {
        return axiosInstance.post('quotation-request/' + quotationRequest.id, quotationRequest);
    },

    downloadDocument: function(quotationRequestId, documentId) {
        return axiosInstance.get('quotation-request/' + quotationRequestId + '/document/' + documentId + '/download');
    },
};
