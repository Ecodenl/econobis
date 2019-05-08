import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchLedgers: () => {
        const requestUrl = `jory/ledger`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'vatCodeId', 'twinfieldLedgerCode'],
                    rlt: { vatCode: { fld: ['id', 'description'] } },
                },
            },
        });
    },
};
