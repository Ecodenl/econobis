import getAxiosInstance from '../default-setup/AxiosInstance';

export default {
    fetchMeasureCategories: () => {
        const requestUrl = `jory/measure-category`;

        return getAxiosInstance().get(requestUrl, {
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
                        'calendarBackgroundColor',
                        'calendarTextColor',
                    ],
                },
            },
        });
    },
};
