import axiosInstance from '../default-setup/AxiosInstance';
import axios from 'axios';

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

let cancelToken;

const URL_SHARED_AREA = `${URL_API}/api/shared-area`;

export default {
    getSharedAreaDetails: (postalCode, number) => {
        const requestUrl = `${URL_SHARED_AREA}/shared-area-details`;

        return axiosInstance
            .post(requestUrl, { postalCode: postalCode, number: number })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                return error.response;
            });
    },

    fetchContactAreaSearch: searchTermContactArea => {
        const requestUrl = `${URL_SHARED_AREA}/search/?searchTerm=${searchTermContactArea}`;

        if (typeof cancelToken != typeof undefined) {
            //Check if there are any previous pending requests
            cancelToken.cancel('Api call canceled due to new request.');
        }

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        return axiosInstance.get(requestUrl, {
            cancelToken: cancelToken.token,
        });
    },
};
