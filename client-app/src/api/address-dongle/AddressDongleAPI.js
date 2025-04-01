import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADDRESS_DONGLE = `${URL_API}/api/address-dongle`;

export default {
    fetchAddressDongles: ({ filters, extraFilters, sorts, pagination }) => {
        const requestUrl = `${URL_ADDRESS_DONGLE}/grid`;

        return axiosInstance.get(requestUrl, {
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
        const requestUrl = `${URL_ADDRESS_DONGLE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
