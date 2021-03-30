import axiosInstance from '../default-setup/AxiosInstance';

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

        return axiosInstance.get(requestUrl, {
            params: {
                jory: defaultFields,
            },
        });
    },

    updateMeasureCategory: measureCategory => {
        const requestUrl = `${URL_MEASURE_CATEGORY}/${measureCategory.id}`;
        return axiosInstance.post(requestUrl, measureCategory, {
            params: {
                jory: defaultFields,
            },
        });
    },
};
