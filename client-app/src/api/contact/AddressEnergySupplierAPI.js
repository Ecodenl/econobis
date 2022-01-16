import axios from 'axios';
import axiosInstance from '../default-setup/AxiosInstance';

const URL_ADDRESS_ENERGY_SUPPLIER = `${URL_API}/api/address-energy-supplier`;

export default {
    validatePeriodOverlap: addressEnergySupplier => {
        let requestUrl = '';
        if (addressEnergySupplier.id) {
            requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}-validate/${addressEnergySupplier.id}`;
        } else {
            requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}-validate`;
        }

        return axiosInstance.post(requestUrl, addressEnergySupplier);
    },

    newAddressEnergySupplier: addressEnergySupplier => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}`;

        return axiosInstance.post(requestUrl, addressEnergySupplier);
    },

    updateAddressEnergySupplier: addressEnergySupplier => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${addressEnergySupplier.id}`;

        return axiosInstance.post(requestUrl, addressEnergySupplier);
    },

    deleteAddressEnergySupplier: id => {
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
