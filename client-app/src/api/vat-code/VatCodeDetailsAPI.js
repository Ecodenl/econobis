import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

const URL_VAT_CODE = `vat-code`;

export default {
    fetchVatCodeDetails: id => {
        const requestUrl = `jory/vat-code/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'startDate', 'description', 'percentage', 'twinfieldCode', 'twinfieldLedgerCode'],
                },
            },
        });
    },

    newVatCode: vatCode => {
        const requestUrl = URL_VAT_CODE;

        vatCode.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, vatCode);
    },

    updateVatCode: vatCode => {
        const requestUrl = `${URL_VAT_CODE}/${vatCode.id}`;

        return axiosInstance.post(requestUrl, vatCode);
    },
};
