import axiosInstance from '../default-setup/AxiosInstance';

const URL_OCCUPATION = `${URL_API}/api/occupation`;

export default {
    newOccupation: occupation => {
        const requestUrl = `${URL_OCCUPATION}`;

        return axiosInstance
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateOccupation: occupation => {
        const requestUrl = `${URL_OCCUPATION}/${occupation.id}/update`;

        return axiosInstance
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteOccupation: occupation => {
        const requestUrl = `${URL_OCCUPATION}/delete`;

        return axiosInstance
            .post(requestUrl, occupation)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
