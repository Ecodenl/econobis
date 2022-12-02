import axiosInstance from '../default-setup/AxiosInstance';

const URL_COACH = `${URL_API}/api/coach`;

export default {
    getCoachPeek: () => {
        const requestUrl = `${URL_COACH}/peek`;

        return axiosInstance
            .get(requestUrl)
            .then(function(response) {
                return response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
