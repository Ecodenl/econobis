import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchByContactId: function(contactId) {
        return axiosInstance.get('contact/' + contactId + '/quotation-request');
    },

    fetchById: function(id) {
        return axiosInstance.get('quotation-request/' + id);
    },

    update: function(quotationRequest) {
        return axiosInstance.post('quotation-request/' + quotationRequest.id, quotationRequest);
    },
};
