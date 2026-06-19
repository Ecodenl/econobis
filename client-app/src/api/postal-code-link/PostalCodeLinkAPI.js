import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchPostalCodeLinks: () => {
        const URL_POSTAL_CODE_LINK = `${getApiUrl()}/api/postal-code-link`;
        const requestUrl = `${URL_POSTAL_CODE_LINK}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    newPostalCodeLink: postalCodeLink => {
        const URL_POSTAL_CODE_LINK = `${getApiUrl()}/api/postal-code-link`;
        const requestUrl = URL_POSTAL_CODE_LINK;

        return getAxiosInstance().post(requestUrl, postalCodeLink);
    },

    updatePostalCodeLink: postalCodeLink => {
        const URL_POSTAL_CODE_LINK = `${getApiUrl()}/api/postal-code-link`;
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${postalCodeLink.id}`;

        return getAxiosInstance().post(requestUrl, postalCodeLink);
    },

    deletePostalCodeLink: id => {
        const URL_POSTAL_CODE_LINK = `${getApiUrl()}/api/postal-code-link`;
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
