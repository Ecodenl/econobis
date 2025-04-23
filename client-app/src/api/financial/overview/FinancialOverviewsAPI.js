import getAxiosInstance from '../../default-setup/AxiosInstance';

export default {
    fetchFinancialOverviews: () => {
        const requestUrl = `jory/financial-overview`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'administrationId', 'year', 'definitive', 'statusId', 'dateProcessed'],
                    rlt: { administration: { fld: ['id', 'name'] } },
                    sorts: ['-year', 'administrationId'],
                },
            },
        });
    },
};
