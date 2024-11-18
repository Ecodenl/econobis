import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchOpportunityStatus: () => {
        const requestUrl = `jory/opportunity-status`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'name', 'usesWf'],
                },
            },
        });
    },
};
