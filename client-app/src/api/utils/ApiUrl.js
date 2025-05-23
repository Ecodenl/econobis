export const getApiUrl = () => {
    if (!window.env || !window.env.URL_API) {
        throw new Error('URL_API is nog niet beschikbaar');
    }

    return window.env.URL_API;
};
