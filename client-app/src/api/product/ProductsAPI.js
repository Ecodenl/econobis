import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchProducts: ({ filters, filterType }) => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/grid`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                filters: JSON.stringify(filters),
                filterType: filterType,
            },
        });
    },

    peekProducts: () => {
        const URL_PRODUCT = `${getApiUrl()}/api/product`;
        const requestUrl = `${URL_PRODUCT}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
