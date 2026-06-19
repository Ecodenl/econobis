import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchCostCenters: () => {
        const requestUrl = `jory/cost-center`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'twinfieldCostCenterCode'],
                },
            },
        });
    },
};
