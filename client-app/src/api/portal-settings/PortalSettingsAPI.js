import getAxiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS = `portal-settings`;

export default {
    fetchPortalSettingsDetails: id => {
        const requestUrl = `jory/portal-settings/${id}`;

        return getAxiosInstance().get(requestUrl, {
            params: {
                jory: {
                    fld: [
                        'id',
                        'portalActive',
                        'portalName',
                        'cooperativeName',
                        'portalWebsite',
                        'portalUrl',
                        'responsibleUserId',
                        'contactResponsibleOwnerUserId',
                        'checkContactTaskResponsibleUserId',
                        'checkContactTaskResponsibleTeamId',
                        'emailTemplateNewAccountId',
                        'linkPrivacyPolicy',
                        'showNewAtCooperativeLink',
                        'newAtCooperativeLinkText',
                        'pcrPowerKwhConsumptionPercentage',
                        'pcrGeneratingCapacityOneSolorPanel',
                        'defaultContactGroupMemberId',
                        'defaultContactGroupNoMemberId',
                        'defaultAdministrationId',
                    ],
                    rlt: {
                        responsibleUser: [],
                        contactResponsibleOwnerUser: [],
                        checkContactTaskResponsibleUser: [],
                        checkContactTaskResponsibleTeam: [],
                        emailTemplateNewAccount: [],
                        defaultContactGroupMember: [],
                        defaultContactGroupNoMember: [],
                        defaultAdministration: [],
                    },
                },
            },
        });
    },

    updatePortalSettings: portalSettings => {
        const requestUrl = `${URL_PORTAL_SETTINGS}/${portalSettings.id}`;

        return getAxiosInstance().post(requestUrl, portalSettings);
    },
};
