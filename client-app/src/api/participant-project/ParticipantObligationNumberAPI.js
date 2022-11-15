import axiosInstance from '../default-setup/AxiosInstance';

const URL_OBLIGATION_NUMBER = `${URL_API}/api/project/participant/obligation-number`;

export default {
    newObligationNumber: obligationNumber => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}`;

        return axiosInstance
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateObligationNumber: obligationNumber => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${obligationNumber.id}`;

        return axiosInstance
            .post(requestUrl, obligationNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteObligationNumber: id => {
        const requestUrl = `${URL_OBLIGATION_NUMBER}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
