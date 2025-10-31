import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_VALUE_COURSE = `project/value-course`;

export default {
    updateProjectValueCourse: (id, data) => {
        const requestUrl = `${URL_VALUE_COURSE}/${id}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    storeProjectValueCourse: data => {
        const requestUrl = `${URL_VALUE_COURSE}`;

        return getAxiosInstance()
            .post(requestUrl, data)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },

    deleteProjectValueCourse: id => {
        const requestUrl = `${URL_VALUE_COURSE}/${id}/delete`;

        return getAxiosInstance()
            .post(requestUrl)
            .then(response => response.data.data)
            .catch(error => {
                console.log(error);
            });
    },
};
