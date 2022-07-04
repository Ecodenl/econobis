import axiosInstance from '../default-setup/AxiosInstance';

const URL_PORTAL_SETTINGS_DASHBOARD = `/portal-settings-dashboard`;

export default {
    fetchDashboardSettings: id => {
        const requestUrl = `${URL_PORTAL_SETTINGS_DASHBOARD}/${id}`;

        return axiosInstance.get(requestUrl);
        // todo WM: opschonen ?
        //

        // return axiosInstance.get(requestUrl, {
        //     params: {
        //         jory: {
        //             fld: [
        //                 'id',
        //                 'welcomeTitle',
        //                 'welcomeMessage',
        //                 'defaultWidgetBackgroundColor',
        //                 'defaultWidgetTextColor',
        //             ],
        //             rlt: {
        //                 widgets: {
        //                     fld: [
        //                         'id',
        //                         'codeRef',
        //                         'order',
        //                         'title',
        //                         'widgetImageFileName',
        //                         'active',
        //                         'text',
        //                         'buttonText',
        //                         'buttonLink',
        //                         'showGroupId',
        //                         'backgroundColor',
        //                         'textColor',
        //                     ],
        //                 },
        //             },
        //         },
        //     },
        // });
    },
};
