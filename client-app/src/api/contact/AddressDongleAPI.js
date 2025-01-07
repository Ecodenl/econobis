import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADDRESS_DONGLE = `${URL_API}/api/address-dongle`;

export default {
    // validateAddressDongleForm: addressDongle => {
    //     let requestUrl = '';
    //     if (addressDongle.id) {
    //         requestUrl = `${URL_ADDRESS_DONGLE}-validate/${addressDongle.id}`;
    //     } else {
    //         requestUrl = `${URL_ADDRESS_DONGLE}-validate`;
    //     }
    //
    //     return axiosInstance.post(requestUrl, addressDongle);
    // },

    newAddressDongle: addressDongle => {
        const requestUrl = `${URL_ADDRESS_DONGLE}`;

        return axiosInstance.post(requestUrl, addressDongle);
    },

    updateAddressDongle: addressDongle => {
        const requestUrl = `${URL_ADDRESS_DONGLE}/${addressDongle.id}`;

        return axiosInstance.post(requestUrl, addressDongle);
    },

    deleteAddressDongle: id => {
        const requestUrl = `${URL_ADDRESS_DONGLE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
