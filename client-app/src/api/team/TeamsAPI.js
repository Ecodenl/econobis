import axiosInstance from '../default-setup/AxiosInstance';

const URL_TEAM = `${URL_API}/api/team`;

export default {
    fetchTeams: () => {
        const requestUrl = `${URL_TEAM}/grid`;

        return axiosInstance.get(requestUrl);
    },

    deleteTeam: id => {
        const requestUrl = `${URL_TEAM}/${id}/delete`;

        return axiosInstance.post(requestUrl);
    },
};
