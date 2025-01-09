import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADDRESS_DONGLE = `${URL_API}/api/address-dongle`;

export default {
    fetchAddressDongleGrid: () => {
        const requestUrl = `${URL_ADDRESS_DONGLE}/grid`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    fetchDongle: id => {
        const requestUrl = `${URL_ADDRESS_DONGLE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
