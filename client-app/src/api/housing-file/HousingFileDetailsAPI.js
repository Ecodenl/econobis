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

    deleteSpecification: housingFileSpecificationId => {
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
};
