import axiosInstance from '../default-setup/AxiosInstance';

const URL_HOUSING_FILE = `${URL_API}/api/housing-file`;

export default {
    fetchHousingFilesDetails: function(id) {
        const requestUrl = `${URL_HOUSING_FILE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newHousingFile: housingFile => {
        const requestUrl = `${URL_API}/api/contact/housing-file`;

        return axiosInstance
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateHousingFile: housingFile => {
        const requestUrl = `${URL_HOUSING_FILE}/${housingFile.id}/update`;

        return axiosInstance
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateHousingFileUse: housingFile => {
        const requestUrl = `${URL_HOUSING_FILE}/${housingFile.id}/update-use`;

        return axiosInstance
            .post(requestUrl, housingFile)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteHousingFile: id => {
        const requestUrl = `${URL_HOUSING_FILE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    addHousingFileSpecification: housingFileSpecification => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification`;

        return axiosInstance.post(requestUrl, housingFileSpecification);
    },

    updateHousingFileSpecification: housingFileSpecification => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification/${housingFileSpecification.id}/update`;

        return axiosInstance.post(requestUrl, housingFileSpecification);
    },

    deleteHousingFileSpecification: housingFileSpecificationId => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-specification/${housingFileSpecificationId}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    addHousingFileHousingStatus: housingFileHousingStatus => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status`;

        return axiosInstance.post(requestUrl, housingFileHousingStatus);
    },

    updateHousingFileHousingStatus: housingFileHousingStatus => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status/${housingFileHousingStatus.id}/update`;

        return axiosInstance.post(requestUrl, housingFileHousingStatus);
    },

    deleteHousingFileHousingStatus: housingFileHousingStatusId => {
        const requestUrl = `${URL_HOUSING_FILE}/housing-file-housing-status/${housingFileHousingStatusId}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    createOpportunitiesFromSpecifications: (housingFileId, specificationIds, campaignId) => {
        const requestUrl = `${URL_HOUSING_FILE}/${housingFileId}/campaign/${campaignId}/create-opportunities`;

        return axiosInstance
            .post(requestUrl, { ids: specificationIds })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchHousingFileSelectionPerType: $selectionType => {
        const requestUrl = `${URL_HOUSING_FILE}/selection/${$selectionType}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
