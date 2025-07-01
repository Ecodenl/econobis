import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_VAT_CODE = `vat-code`;

export default {
    fetchVatCodeDetails: id => {
        const requestUrl = `jory/vat-code/${id}`;

        return getAxiosInstance().get(requestUrl, {
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

        return getAxiosInstance().post(requestUrl, vatCode);
    },

    updateVatCode: vatCode => {
        const requestUrl = `${URL_VAT_CODE}/${vatCode.id}`;

        return getAxiosInstance().post(requestUrl, vatCode);
    },
};
