import axiosInstance from '../default-setup/AxiosInstance';

const URL_PRODUCT = `${URL_API}/api/product`;

export default {
    fetchProducts: ({ filters, filterType }) => {
        const requestUrl = `${URL_PRODUCT}/grid`;

        return axiosInstance.get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                filterType: filterType,
            },
        });
    },

    peekProducts: () => {
        const requestUrl = `${URL_PRODUCT}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
