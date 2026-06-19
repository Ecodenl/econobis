import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    getCoachPeek: () => {
        const URL_INSPECTION_PERSON = `${getApiUrl()}/api`;
        const requestUrl = `${URL_INSPECTION_PERSON}/coach-peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getProjectManagerPeek: () => {
        const URL_INSPECTION_PERSON = `${getApiUrl()}/api`;
        const requestUrl = `${URL_INSPECTION_PERSON}/project-manager-peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getExternalPartyPeek: () => {
        const URL_INSPECTION_PERSON = `${getApiUrl()}/api`;
        const requestUrl = `${URL_INSPECTION_PERSON}/external-party-peek`;

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
