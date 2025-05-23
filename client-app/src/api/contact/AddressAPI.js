import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newAddress: address => {
        const URL_ADDRESS = `${getApiUrl()}/api/address`;
        const requestUrl = `${URL_ADDRESS}`;

        return getAxiosInstance().post(requestUrl, address);
    },

    updateAddress: address => {
        const URL_ADDRESS = `${getApiUrl()}/api/address`;
        const requestUrl = `${URL_ADDRESS}/${address.id}`;

        return getAxiosInstance().post(requestUrl, address);
    },

    deleteAddress: id => {
        const URL_ADDRESS = `${getApiUrl()}/api/address`;
        const requestUrl = `${URL_ADDRESS}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    getLvbagAddress: (postalCode, number) => {
        const URL_ADDRESS = `${getApiUrl()}/api/address`;
        const requestUrl = `${URL_ADDRESS}/lvbag`;

        return getAxiosInstance()
            .post(requestUrl, { postalCode: postalCode, number: number })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
