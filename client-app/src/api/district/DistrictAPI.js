import axiosInstance from '../default-setup/AxiosInstance';

const BASE_URL = 'district';

export default {
    fetchDistricts: () => {
        return axiosInstance.get(`${BASE_URL}/grid`).then(response => {
            return response.data;
        });
    },
};
