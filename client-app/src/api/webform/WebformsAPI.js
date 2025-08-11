import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchWebforms: () => {
        const URL_WEBFORM = `${getApiUrl()}/api/webform`;
        const requestUrl = `${URL_WEBFORM}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    deleteWebform: id => {
        const URL_WEBFORM = `${getApiUrl()}/api/webform`;
        const requestUrl = `${URL_WEBFORM}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
