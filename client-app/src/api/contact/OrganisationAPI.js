import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newOrganisation: organisation => {
        const URL_ORGANISATION = `${getApiUrl()}/api/organisation`;
        const requestUrl = `${URL_ORGANISATION}`;

        return getAxiosInstance().post(requestUrl, organisation);
    },

    updateOrganisation: organisation => {
        const URL_ORGANISATION = `${getApiUrl()}/api/organisation`;
        const requestUrl = `${URL_ORGANISATION}/${organisation.id}`;

        return getAxiosInstance().post(requestUrl, organisation);
    },

    getOrganisationPeek: () => {
        const URL_ORGANISATION = `${getApiUrl()}/api/organisation`;
        const requestUrl = `${URL_ORGANISATION}/peek`;

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
