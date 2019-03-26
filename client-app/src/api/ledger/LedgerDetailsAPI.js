import axiosInstance from '../default-setup/AxiosInstance';

const URL_LEDGER = `ledger`;

export default {
    fetchLedgerDetails: id => {
        const requestUrl = `jory/ledger/${id}`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'vatCodeId', 'twinfieldLedgerCode'],
                    rlt: { vatCode: { fld: ['id', 'description'] } },
                },
            },
        });
    },

    newLedger: ledger => {
        const requestUrl = URL_LEDGER;

        ledger.jory = JSON.stringify({
            fld: ['id'],
        });

        return axiosInstance.post(requestUrl, ledger);
    },

    updateLedger: ledger => {
        const requestUrl = `${URL_LEDGER}/${ledger.id}`;

        return axiosInstance.post(requestUrl, ledger);
    },
};
