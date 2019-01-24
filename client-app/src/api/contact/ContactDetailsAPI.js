import axios from 'axios';

const URL_CONTACTDETAILS = `${URL_API}/api/contact`;

export default {
    getContactDetails: id => {
        const requestUrl = `${URL_CONTACTDETAILS}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
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
        const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
        axios.defaults.headers.common.Authorization = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
