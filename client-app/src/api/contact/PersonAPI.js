import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    newPerson: person => {
        const URL_PERSON = `${getApiUrl()}/api/person`;
        const requestUrl = `${URL_PERSON}`;

        return getAxiosInstance().post(requestUrl, person);
    },

    updatePerson: person => {
        const URL_PERSON = `${getApiUrl()}/api/person`;
        const requestUrl = `${URL_PERSON}/${person.id}`;

        return getAxiosInstance().post(requestUrl, person);
    },

    getPersonPeek: () => {
        const URL_PERSON = `${getApiUrl()}/api/person`;
        const requestUrl = `${URL_PERSON}/peek`;

        return getAxiosInstance()
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    makePrimary: person => {
        const URL_PERSON = `${getApiUrl()}/api/person`;
        const requestUrl = `${URL_PERSON}/${person.id}`;

        return getAxiosInstance()
            .post(requestUrl, person)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
