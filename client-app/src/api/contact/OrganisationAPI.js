import axiosInstance from '../default-setup/AxiosInstance';

const URL_ORGANISATION = `${URL_API}/api/organisation`;

export default {
    newOrganisation: organisation => {
        const requestUrl = `${URL_ORGANISATION}`;

        return axiosInstance.post(requestUrl, organisation);
    },

    updateOrganisation: organisation => {
        const requestUrl = `${URL_ORGANISATION}/${organisation.id}`;

        return axiosInstance.post(requestUrl, organisation);
    },

    getOrganisationPeek: () => {
        const requestUrl = `${URL_ORGANISATION}/peek`;

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
