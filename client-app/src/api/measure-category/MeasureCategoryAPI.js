import axiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchMeasureCategories: () => {
        const requestUrl = `jory/measure-category`;

        return axiosInstance.get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'name',
                        'usesWfCreateOpportunity',
                        'measureIdWfCreateOpportunity',
                        'opportunityStatusIdWfCreateOpportunity',
                        'usesWfCreateQuotationRequest',
                        'organisationIdWfCreateQuotationRequest',
                        'usesWfEmailQuotationRequest',
                        'emailTemplateIdWfCreateQuotationRequest',
                    ],
                },
            },
        });
    },
};
