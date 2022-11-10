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

    quotationRequestDownloadDocument: function(quotationRequestId, id) {
        const requestUrl = `quotation-request/${quotationRequestId}/document/${id}/download`;

        return axiosInstance.get(requestUrl, { responseType: 'blob' });
    },
};
