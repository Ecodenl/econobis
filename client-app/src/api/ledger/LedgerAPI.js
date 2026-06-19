import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchLedgers: () => {
        const requestUrl = `jory/ledger`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'vatCodeId', 'twinfieldLedgerCode'],
                    rlt: { vatCode: { fld: ['id', 'description'] } },
                },
            },
        });
    },
};
