import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchCostCenters: () => {
        const requestUrl = `jory/cost-center`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'description', 'twinfieldCostCenterCode'],
                },
            },
        });
    },
};
