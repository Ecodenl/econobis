import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchVatCodes: () => {
        const requestUrl = `jory/vat-code`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: ['id', 'startDate', 'description', 'percentage'],
                },
            },
        });
    },
};
