import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchWebformDetails: id => {
        const URL_WEBFORM = `${getApiUrl()}/api/webform`;
        const requestUrl = `${URL_WEBFORM}/${id}`;

        return getAxiosInstance().get(requestUrl);
    },

    newWebform: webform => {
        const URL_WEBFORM = `${getApiUrl()}/api/webform`;
        const requestUrl = URL_WEBFORM;

        return getAxiosInstance().post(requestUrl, webform);
    },

    updateWebform: webform => {
        const URL_WEBFORM = `${getApiUrl()}/api/webform`;
        const requestUrl = `${URL_WEBFORM}/${webform.id}`;

        return getAxiosInstance().post(requestUrl, webform);
    },
};
