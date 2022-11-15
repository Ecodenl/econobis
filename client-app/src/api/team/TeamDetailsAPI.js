import axiosInstance from '../default-setup/AxiosInstance';

const URL_TEAM = `${URL_API}/api/team`;

export default {
    fetchTeamDetails: id => {
        const requestUrl = `${URL_TEAM}/${id}`;

        return axiosInstance.get(requestUrl);
    },

    newTeam: team => {
        const requestUrl = URL_TEAM;

        return axiosInstance.post(requestUrl, team);
    },

    updateTeam: team => {
        const requestUrl = `${URL_TEAM}/${team.id}`;

        return axiosInstance.post(requestUrl, team);
    },

    newTeamUser: ({ teamId, userId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/attach`;

        return axiosInstance.post(requestUrl);
    },

    deleteTeamUser: ({ teamId, userId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/detach`;

        return axiosInstance.post(requestUrl);
    },

    newTeamContactGroup: ({ teamId, contactGroupId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${contactGroupId}/attach-contact-group`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteTeamContactGroup: ({ teamId, contactGroupId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${contactGroupId}/detach-contact-group`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    newTeamDocumentCreatedFrom: ({ teamId, documentCreatedFromId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${documentCreatedFromId}/attach-document-created-from`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteTeamDocumentCreatedFrom: ({ teamId, documentCreatedFromId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${documentCreatedFromId}/detach-document-created-from`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};
