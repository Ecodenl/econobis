import axiosInstance from '../../default-setup/AxiosInstance';

export default {
    fetchFinancialOverviews: () => {
        const requestUrl = `jory/financial-overview`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'administrationId', 'year', 'definitive', 'dateProcessed'],
                    rlt: { administration: { fld: ['id', 'name'] } },
                    sorts: ['-year', 'administrationId'],
                },
            },
        });
    },
};
