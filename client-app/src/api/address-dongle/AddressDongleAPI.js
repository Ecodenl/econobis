import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchAddressDongles: ({ filters, extraFilters, sorts, pagination }) => {
        const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
        const requestUrl = `${URL_ADDRESS_DONGLE}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                extraFilters: JSON.stringify(extraFilters),
                sorts: JSON.stringify(sorts),
                limit: pagination.limit,
                offset: pagination.offset,
            },
        });
        // .then(response => response.data.data)
        // .catch(error => {
        //     console.log(error);
        // });
    },

    fetchDongle: id => {
        const URL_ADDRESS_DONGLE = `${getApiUrl()}/api/address-dongle`;
        const requestUrl = `${URL_ADDRESS_DONGLE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
