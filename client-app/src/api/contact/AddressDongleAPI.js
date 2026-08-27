import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    // validateAddressDongleForm: addressDongle => {
    // const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
    //     let requestUrl = '';
    //     if (addressDongle.id) {
    //         requestUrl = `${URL_ADDRESS_DONGLE}-validate/${addressDongle.id}`;
    //     } else {
    //         requestUrl = `${URL_ADDRESS_DONGLE}-validate`;
    //     }
    //
    //     return getAxiosInstance().post(requestUrl, addressDongle);
    // },

    newAddressDongle: addressDongle => {
        const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
        const requestUrl = `${URL_ADDRESS_DONGLE}`;

        return getAxiosInstance().post(requestUrl, addressDongle);
    },

    updateAddressDongle: addressDongle => {
        const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
        const requestUrl = `${URL_ADDRESS_DONGLE}/${addressDongle.id}`;

        return getAxiosInstance().post(requestUrl, addressDongle);
    },

    deleteAddressDongle: id => {
        const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
        const requestUrl = `${URL_ADDRESS_DONGLE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
