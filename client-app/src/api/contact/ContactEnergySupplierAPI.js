import axios from 'axios';

const URL_CONTACT_ENERGY_SUPPLIER = `${URL_API}/api/contact-energy-supplier`;

export default {
    newContactEnergySupplier: contactEnergySupplier => {
        const requestUrl = `${URL_CONTACT_ENERGY_SUPPLIER}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, contactEnergySupplier)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateContactEnergySupplier: contactEnergySupplier => {
        const requestUrl = `${URL_CONTACT_ENERGY_SUPPLIER}/${contactEnergySupplier.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, contactEnergySupplier)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteContactEnergySupplier: id => {
        const requestUrl = `${URL_CONTACT_ENERGY_SUPPLIER}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },
};
