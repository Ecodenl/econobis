import axios from 'axios';

const URL_COACH = `${URL_API}/api/coach`;

export default {
    getCoachPeek: () => {
        const requestUrl = `${URL_COACH}/peek`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
