import axiosInstance from '../default-setup/AxiosInstance';

const URL_PHONE_NUMBER = `${URL_API}/api/phone-number`;

export default {
    newPhoneNumber: phoneNumber => {
        const requestUrl = `${URL_PHONE_NUMBER}`;

        return axiosInstance
            .post(requestUrl, phoneNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updatePhoneNumber: phoneNumber => {
        const requestUrl = `${URL_PHONE_NUMBER}/${phoneNumber.id}`;

        return axiosInstance
            .post(requestUrl, phoneNumber)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deletePhoneNumber: id => {
        const requestUrl = `${URL_PHONE_NUMBER}/${id}/delete`;

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
