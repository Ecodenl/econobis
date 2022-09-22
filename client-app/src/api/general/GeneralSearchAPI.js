import axiosInstance from '../default-setup/AxiosInstance';

export default {
    search: function(data) {
        const requestUrl = `${URL_API}/api/general-search`;

        return axiosInstance
            .post(requestUrl, { searchText: data })
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    },
};
