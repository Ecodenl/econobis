import React from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './router';
import './styles/style.scss';
import 'moment/locale/nl';
import 'bootstrap-sass';

import * as authActions from './actions/general/AuthActions';
import { createRoot } from 'react-dom/client';

const store = require('./store/configureStore').configure();
const token = localStorage.getItem('access_token');

if (token) {
    store.dispatch(authActions.authSuccess());
}

const fetchConfig = async () => {
    const backendUrl = document.querySelector('meta[name="backend-url"]')?.content || '';
    // console.log('backendUrl: ', backendUrl);

    const response = await fetch(`${backendUrl}/frontend-config`);
    const config = await response.json();
    // console.log('config: ', config);

    window.env = {
        CLIENT_ID: config.client_id,
        CLIENT_KEY: config.client_key,
        URL_API: config.url_api,
    };
};

// Detecteer IE
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const App = () => (
    <Provider store={store}>
        <AppRoutes />
    </Provider>
);

const IEPage = () => (
    <div>
        <h1>Sorry, Econobis werkt niet met uw browser!</h1>
        <p>
            Het lijkt erop dat u met een oudere versie van uw browser werkt of Internet Explorer gebruikt. Kies een
            andere browser of werk uw browser bij naar de laatste versie.
        </p>
    </div>
);

fetchConfig().then(() => {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(isIE ? <IEPage /> : <App />);
});
