import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchTeams: () => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/grid`;

        return getAxiosInstance().get(requestUrl);
    },

    deleteTeam: id => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${id}/delete`;

        return getAxiosInstance().post(requestUrl);
    },
};
