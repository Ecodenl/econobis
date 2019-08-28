import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchCustomerDetails: function() {
        const requestUrl = `/me`;

        return axiosInstance.get(requestUrl);
    },
};
