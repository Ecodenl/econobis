import axios from 'axios';

const URL_QUOTATION_REQUEST = `${URL_API}/api/quotation-request`;

export default {
    fetchQuotationRequestDetails: function (id) {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    },

    fetchNewQuotationRequest: (opportunityId) => {
        const requestUrl = `${URL_API}/api/opportunity/${opportunityId}/quotation-request`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    newQuotationRequest: (quotationRequest) => {
        const requestUrl = `${URL_QUOTATION_REQUEST}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, quotationRequest)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    updateQuotationRequest: (quotationRequest) => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${quotationRequest.id}/update`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, quotationRequest)
            .then(function (response) {
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    deleteQuotationRequest: (id) => {
        const requestUrl = `${URL_QUOTATION_REQUEST}/${id}/delete`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};