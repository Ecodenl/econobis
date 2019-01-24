import axiosInstance from '../default-setup/AxiosInstance';

const URL_VALUE_COURSE = `production-project/value-course`;

export default {
    updateProjectValueCourse: (id, data) => {
        const requestUrl = `${URL_VALUE_COURSE}/${id}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProjectValueCourse: data => {
        const requestUrl = `${URL_VALUE_COURSE}`;

        return axiosInstance
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteProjectValueCourse: id => {
        const requestUrl = `${URL_VALUE_COURSE}/${id}/delete`;

        return axiosInstance
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
