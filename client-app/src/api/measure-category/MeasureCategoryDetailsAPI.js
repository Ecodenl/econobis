import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_MEASURE_CATEGORY = `measure-category`;

const defaultFields = {
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
        'calendarTextColor'
    ],
    rlt: {
        measureWorkflowCreateOpportunity: [],
        opportunityStatusWorkflowCreateOpportunity: [],
        organisationWorkflowCreateQuotationRequest: [],
        emailTemplateWorkflowCreateQuotationRequest: [],
    },
};

export default {
    fetchMeasureCategoryDetails: id => {
        const requestUrl = `jory/measure-category/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateMeasureCategory: measureCategory => {
        const requestUrl = `${URL_MEASURE_CATEGORY}/${measureCategory.id}`;
        return getAxiosInstance().post(requestUrl, measureCategory, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
