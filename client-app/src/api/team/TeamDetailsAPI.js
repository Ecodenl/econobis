import axios from 'axios';

const URL_TEAM = `${URL_API}/api/team`;

export default {
    fetchTeamDetails: id => {
        const requestUrl = `${URL_TEAM}/${id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.get(requestUrl);
    },

    newTeam: team => {
        const requestUrl = URL_TEAM;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, team);
    },

    updateTeam: team => {
        const requestUrl = `${URL_TEAM}/${team.id}`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl, team);
    },

    newTeamUser: ({ teamId, userId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/attach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteTeamUser: ({ teamId, userId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/detach`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
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

    newTeamMailbox: ({ teamId, mailboxId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${mailboxId}/attach-mailbox`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },

    deleteTeamMailbox: ({ teamId, mailboxId }) => {
        const requestUrl = `${URL_TEAM}/${teamId}/${mailboxId}/detach-mailbox`;
        const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

        return axios.post(requestUrl);
    },
};
