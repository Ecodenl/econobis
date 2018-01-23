import axios from 'axios';

const URL_API = process.env.URL_API;
const AUTH_KEY = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
};

export default {
    loginUser: (loginCredentials) => {
        const requestUrl = `${URL_API}/oauth/token`;
        delete axios.defaults.headers.common['Authorization'];

        return axios.post(requestUrl, {...AUTH_KEY, ...loginCredentials})
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                    // Error meldingen uitlezen en juiste error melding teruggeven.
                    return {error: 'Geen juiste login gegevens ingevuld'};
                }
            );
    }
};