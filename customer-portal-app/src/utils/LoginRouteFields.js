// LoginRouteFields.js
import { isEmpty } from 'lodash';

export const getApiUrl = () => {
    if (isEmpty(localStorage.getItem('url_api'))) {
        throw new Error('url_api is nog niet beschikbaar');
    }
    return localStorage.getItem('url_api');
};

export const getRedirectUri = () => {
    if (isEmpty(localStorage.getItem('redirect_uri'))) {
        throw new Error('redirect_uri is nog niet beschikbaar');
    }
    return localStorage.getItem('redirect_uri');
};

export const getClientId = () => {
    if (isEmpty(localStorage.getItem('client_id'))) {
        throw new Error('client_id is nog niet beschikbaar');
    }
    return localStorage.getItem('client_id');
};
