import axiosInstance from '../default-setup/AxiosInstance';

const URL_INSPECTION_PERSON = `${URL_API}/api`;

export default {
    getCoachPeek: () => {
        const requestUrl = `${URL_INSPECTION_PERSON}/coach-peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getProjectManagerPeek: () => {
        const requestUrl = `${URL_INSPECTION_PERSON}/project-manager-peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    getExternalPartyPeek: () => {
        const requestUrl = `${URL_INSPECTION_PERSON}/external-party-peek`;

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
