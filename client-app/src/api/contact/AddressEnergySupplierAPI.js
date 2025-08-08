import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    validateAddressEnergySupplierForm: addressEnergySupplier => {
        const URL_ADDRESS_ENERGY_SUPPLIER = `${getApiUrl()}/api/address-energy-supplier`;
        let requestUrl = '';
        if (addressEnergySupplier.id) {
            requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}-validate/${addressEnergySupplier.id}`;
        } else {
            requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}-validate`;
        }

        return getAxiosInstance().post(requestUrl, addressEnergySupplier);
    },

    newAddressEnergySupplier: addressEnergySupplier => {
        const URL_ADDRESS_ENERGY_SUPPLIER = `${getApiUrl()}/api/address-energy-supplier`;
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}`;

        return getAxiosInstance().post(requestUrl, addressEnergySupplier);
    },

    updateAddressEnergySupplier: addressEnergySupplier => {
        const URL_ADDRESS_ENERGY_SUPPLIER = `${getApiUrl()}/api/address-energy-supplier`;
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${addressEnergySupplier.id}`;

        return getAxiosInstance().post(requestUrl, addressEnergySupplier);
    },

    deleteAddressEnergySupplier: id => {
        const URL_ADDRESS_ENERGY_SUPPLIER = `${getApiUrl()}/api/address-energy-supplier`;
        const requestUrl = `${URL_ADDRESS_ENERGY_SUPPLIER}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
