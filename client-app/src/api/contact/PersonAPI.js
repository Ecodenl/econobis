import axiosInstance from '../default-setup/AxiosInstance';

const URL_PERSON = `${URL_API}/api/person`;

export default {
    newPerson: person => {
        const requestUrl = `${URL_PERSON}`;

        return axiosInstance.post(requestUrl, person);
    },

    updatePerson: person => {
        const requestUrl = `${URL_PERSON}/${person.id}`;

        return axiosInstance.post(requestUrl, person);
    },

    getPersonPeek: () => {
        const requestUrl = `${URL_PERSON}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    makePrimary: person => {
        const requestUrl = `${URL_PERSON}/${person.id}`;

        return axiosInstance
            .post(requestUrl, person)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
