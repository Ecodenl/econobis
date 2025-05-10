export const getClientId = () => {
    if (!window.env || !window.env.CLIENT_ID) {
        throw new Error('CLIENT_ID is nog niet beschikbaar');
    }

    return window.env.CLIENT_ID;
};
export const getApiUrl = () => {
    if (!window.env || !window.env.URL_API) {
        throw new Error('URL_API is nog niet beschikbaar');
    }

    return window.env.URL_API;
};

export const getRedirectUri = () => {
    if (!window.env || !window.env.URL_API) {
        throw new Error('URL_API is nog niet beschikbaar');
    }

    // if (window.location.hostname === 'localhost') {
    return `${window.env.URL_API}/redirect.html`;
    // } else {
    //     return `${window.env.URL_API}/#/auth/callback-temp`;
    // }
};
