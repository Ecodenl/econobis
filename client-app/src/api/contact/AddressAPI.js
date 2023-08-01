import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADDRESS = `${URL_API}/api/address`;

export default {
    newAddress: address => {
        const requestUrl = `${URL_ADDRESS}`;

        return axiosInstance.post(requestUrl, address);
    },

    updateAddress: address => {
        const requestUrl = `${URL_ADDRESS}/${address.id}`;

        return axiosInstance.post(requestUrl, address);
    },

    deleteAddress: id => {
        const requestUrl = `${URL_ADDRESS}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    getLvbagAddress: (postalCode, number) => {
        const requestUrl = `${URL_ADDRESS}/lvbag`;

        return axiosInstance
            .post(requestUrl, { postalCode: postalCode, number: number })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
