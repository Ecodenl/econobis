import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADMINISTRATION = `${URL_API}/api/administration`;

export default {
    fetchAdministrations: () => {
        const requestUrl = `${URL_ADMINISTRATION}/grid`;

        return axiosInstance.get(requestUrl);
    },

    peekAdministrations: () => {
        const requestUrl = `${URL_ADMINISTRATION}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    fetchTwinfieldInfoAdministrations: () => {
        const requestUrl = `${URL_ADMINISTRATION}/twinfield-info-administrations`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    peekLedgers: id => {
        const requestUrl = `${URL_ADMINISTRATION}/${id}/ledger/peek`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
