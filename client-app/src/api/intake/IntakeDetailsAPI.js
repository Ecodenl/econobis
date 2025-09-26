import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchIntakeDetails: function(id) {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/${id}`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    newIntake: intake => {
        const requestUrl = `${getApiUrl()}/api/contact/intake`;

        return getAxiosInstance()
            .post(requestUrl, intake)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    updateIntake: intake => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/${intake.id}/update`;

        return getAxiosInstance()
            .post(requestUrl, intake)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    deleteIntake: id => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteBulkIntakes: ids => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/bulk-delete`;

        return getAxiosInstance().post(requestUrl, { ids: ids });
    },

    updateBulkIntakes: (ids, values) => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/bulk-update`;

        return getAxiosInstance().post(requestUrl, { ids: ids, ...values });
    },

    attachMeasureRequested: (intakeId, measureId) => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/attach`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                return error;
            });
    },

    detachMeasureRequested: (intakeId, measureId) => {
        const URL_INTAKE = `${getApiUrl()}/api/intake`;
        const requestUrl = `${URL_INTAKE}/${intakeId}/${measureId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },
};
