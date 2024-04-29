import axiosInstance from '../default-setup/AxiosInstance';

const URL_INTAKE = `${URL_API}/api/intake`;

export default {
    fetchIntakeDetails: function(id) {
        const requestUrl = `${URL_INTAKE}/${id}`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newIntake: intake => {
        const requestUrl = `${URL_API}/api/contact/intake`;

        return axiosInstance
            .post(requestUrl, intake)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateIntake: intake => {
        const requestUrl = `${URL_INTAKE}/${intake.id}/update`;

        return axiosInstance
            .post(requestUrl, intake)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteIntake: id => {
        const requestUrl = `${URL_INTAKE}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },

    deleteBulkIntakes: ids => {
        const requestUrl = `${URL_INTAKE}/bulk-delete`;

        return axiosInstance.post(requestUrl, { ids: ids });
    },

    updateBulkIntakes: (ids, values) => {
        const requestUrl = `${URL_INTAKE}/bulk-update`;

        return axiosInstance.post(requestUrl, { ids: ids, ...values });
    },

    attachMeasureRequested: (intakeId, measureId) => {
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/attach`;

        return axiosInstance
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    detachMeasureRequested: (intakeId, measureId) => {
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/detach`;

        return axiosInstance.post(requestUrl);
    },
};
