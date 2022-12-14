import axiosInstance from '../default-setup/AxiosInstance';

const URL_CONTACTDETAILS = `${URL_API}/api/contact`;

export default {
    getContactDetails: id => {
        const requestUrl = `${URL_CONTACTDETAILS}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    getContactDetailsWithAddresses: id => {
        const requestUrl = `${URL_CONTACTDETAILS}/${id}/addresses`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateContactOwner: (contactId, userId) => {
        const requestUrl = `${URL_CONTACTDETAILS}/${contactId}/owner/${userId}/associate`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    makeHoomDossier: id => {
        const requestUrl = `contact/${id}/make-hoomdossier`;

        return axiosInstance.get(requestUrl);
    },

    getContactSummary: id => {
        const requestUrl = `${URL_CONTACTDETAILS}/${id}/summary`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data;
            });
    },

};
