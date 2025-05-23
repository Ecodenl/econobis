import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    search: function(data) {
        const requestUrl = `${getApiUrl()}/api/general-search`;

        return getAxiosInstance()
            .post(requestUrl, { searchText: data })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
