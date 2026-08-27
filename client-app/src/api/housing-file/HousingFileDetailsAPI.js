import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchHousingFilesDetails: function(id) {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newHousingFile: housingFile => {
        const requestUrl = `${getApiUrl()}/api/contact/housing-file`;

        return getAxiosInstance()
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateHousingFile: housingFile => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${housingFile.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateHousingFileUse: housingFile => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${housingFile.id}/update-use`;

        return getAxiosInstance()
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteHousingFile: id => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    addHousingFileSpecification: housingFileSpecification => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification`;

        return getAxiosInstance().post(requestUrl, housingFileSpecification);
    },

    updateHousingFileSpecification: housingFileSpecification => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification/${housingFileSpecification.id}/update`;

        return getAxiosInstance().post(requestUrl, housingFileSpecification);
    },

    deleteHousingFileSpecification: housingFileSpecificationId => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification/${housingFileSpecificationId}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    addHousingFileHousingStatus: housingFileHousingStatus => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status`;

        return getAxiosInstance().post(requestUrl, housingFileHousingStatus);
    },

    updateHousingFileHousingStatus: housingFileHousingStatus => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status/${housingFileHousingStatus.id}/update`;

        return getAxiosInstance().post(requestUrl, housingFileHousingStatus);
    },

    deleteHousingFileHousingStatus: housingFileHousingStatusId => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status/${housingFileHousingStatusId}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    createOpportunitiesFromSpecifications: (housingFileId, specificationIds, campaignId) => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${housingFileId}/campaign/${campaignId}/create-opportunities`;

        return getAxiosInstance()
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    createQuotationRequestsFromSpecifications: (housingFileId, opportunityIds, organisationOrCoachId) => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/${housingFileId}/contact/${organisationOrCoachId}/create-quotation-requests`;

        return getAxiosInstance()
            .post(requestUrl, { ids: opportunityIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchHousingFileSelectionPerType: $selectionType => {
        const URL_HOUSING_FILE = `${getApiUrl()}/api/housing-file`;
        const requestUrl = `${URL_HOUSING_FILE}/selection/${$selectionType}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
