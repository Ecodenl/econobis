import axios from 'axios';

const URL_ADDRESS_ENERGY_SUPPLIER = `${URL_API}/api/contact-energy-supplier`;

export default {
    newAddressEnergySupplier: addressEnergySupplier => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, addressEnergySupplier)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    updateAddressEnergySupplier: addressEnergySupplier => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${addressEnergySupplier.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .post(requestUrl, addressEnergySupplier)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    deleteAddressEnergySupplier: id => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${id}/delete`;
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
