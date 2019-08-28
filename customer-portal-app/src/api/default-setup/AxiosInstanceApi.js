import axios from 'axios';
const API_URL = 'http://framework/econobis/public';

const axiosInstanceAPI = axios.create({
    baseURL: `${API_URL}/api/`,
});

export default axiosInstanceAPI;
