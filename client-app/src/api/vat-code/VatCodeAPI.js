import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchVatCodes: () => {
        const requestUrl = `jory/vat-code`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'startDate', 'description', 'percentage'],
                },
            },
        });
    },
};
