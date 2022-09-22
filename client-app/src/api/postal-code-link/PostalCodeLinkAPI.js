import axiosInstance from '../default-setup/AxiosInstance';

const URL_POSTAL_CODE_LINK = `${URL_API}/api/postal-code-link`;

export default {
    fetchPostalCodeLinks: () => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/grid`;

        return axiosInstance.get(requestUrl);
    },

    newPostalCodeLink: postalCodeLink => {
        const requestUrl = URL_POSTAL_CODE_LINK;

        return axiosInstance.post(requestUrl, postalCodeLink);
    },

    updatePostalCodeLink: postalCodeLink => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${postalCodeLink.id}`;

        return axiosInstance.post(requestUrl, postalCodeLink);
    },

    deletePostalCodeLink: id => {
        const requestUrl = `${URL_POSTAL_CODE_LINK}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
