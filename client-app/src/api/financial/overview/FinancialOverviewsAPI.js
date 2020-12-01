import axiosInstance from '../../default-setup/AxiosInstance';

export default {
    fetchFinancialOverviews: () => {
        const requestUrl = `jory/financial-overview`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'administrationId', 'year', 'definitive'],
                    rlt: { administration: { fld: ['id', 'name'] } },
                    sorts: ['-year', 'administrationId'],
                },
            },
        });
    },
};
