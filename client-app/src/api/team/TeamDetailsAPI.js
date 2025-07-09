import getAxiosInstance from '../default-setup/AxiosInstance';
import { getApiUrl } from '../utils/ApiUrl';

export default {
    fetchTeamDetails: id => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${id}`;

        return getAxiosInstance().get(requestUrl);
    },

    newTeam: team => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = URL_TEAM;

        return getAxiosInstance().post(requestUrl, team);
    },

    updateTeam: team => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${team.id}`;

        return getAxiosInstance().post(requestUrl, team);
    },

    newTeamUser: ({ teamId, userId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/attach`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteTeamUser: ({ teamId, userId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${userId}/detach`;

        return getAxiosInstance().post(requestUrl);
    },

    newTeamContactGroup: ({ teamId, contactGroupId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${contactGroupId}/attach-contact-group`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteTeamContactGroup: ({ teamId, contactGroupId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${contactGroupId}/detach-contact-group`;

        return getAxiosInstance().post(requestUrl);
    },

    newTeamDocumentCreatedFrom: ({ teamId, documentCreatedFromId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${documentCreatedFromId}/attach-document-created-from`;

        return getAxiosInstance().post(requestUrl);
    },

    deleteTeamDocumentCreatedFrom: ({ teamId, documentCreatedFromId }) => {
        const URL_TEAM = `${getApiUrl()}/api/team`;
        const requestUrl = `${URL_TEAM}/${teamId}/${documentCreatedFromId}/detach-document-created-from`;

        return getAxiosInstance().post(requestUrl);
    },
};
