import getAxiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';
import { getApiUrl } from '../utils/ApiUrl';

// try {
//     getAxiosInstance().CancelToken = axios.CancelToken;
//     getAxiosInstance().isCancel = axios.isCancel;
// } catch (e) {
//     console.warn('Axios instance is nog niet beschikbaar bij load time:', e.message);
// }

let cancelToken;

export default {
    getSharedAreaDetails: (postalCode, number) => {
        const URL_SHARED_AREA = `${getApiUrl()}/api/shared-area`;
        const requestUrl = `${URL_SHARED_AREA}/shared-area-details`;

        return getAxiosInstance()
            .post(requestUrl, { postalCode: postalCode, number: number })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchContactAreaSearch: searchTermContactArea => {
        const URL_SHARED_AREA = `${getApiUrl()}/api/shared-area`;
        const requestUrl = `${URL_SHARED_AREA}/search/?searchTerm=${searchTermContactArea}`;
        getAxiosInstance().CancelToken = axios.CancelToken;
        getAxiosInstance().isCancel = axios.isCancel;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        return getAxiosInstance().get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },
};
