export const getApiUrl = () => {
    console.log('Debug AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('test_url_api 1' + localStorage.getItem('test_url_api'));

    if (!window.env || !window.env.URL_API) {
        throw new Error('URL_API is nog niet beschikbaar');
    }

    return window.env.URL_API;
};
export const getRedirectUri = () => {
    console.log('Debug AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('test_url_api 2' + localStorage.getItem('test_url_api'));

    if (!window.env || !window.env.URL_API) {
        throw new Error('URL_API is nog niet beschikbaar');
    }

    if (window.location.hostname === 'localhost') {
        console.log('loginRouteFields - getRedirectUri - localhost');
        return `${window.env.URL_API}/redirect.html`;
    } else {
        console.log(`loginRouteFields - getRedirectUri - ${window.env.URL_API}`);
        return `${window.env.URL_API}/auth/callback`;
    }
};
// todo WM xxx opschonen
export const getClientId = () => {
    console.log('Debug AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log('test_client_id' + localStorage.getItem('test_client_id'));

    if (!window.env || !window.env.CLIENT_ID) {
        throw new Error('CLIENT_ID is nog niet beschikbaar');
    }
    return window.env.CLIENT_ID;
};
