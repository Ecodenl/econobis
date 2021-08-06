import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './router';
import './styles/style.scss';
import 'babel-polyfill';
import 'moment/locale/nl';
import 'bootstrap-sass';

import * as authActions from './actions/general/AuthActions';

const store = require('./store/configureStore').configure();

const token = localStorage.getItem('access_token');

if (token) {
    store.dispatch(authActions.authSuccess());
}

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

let isNotIE = !isIE;

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

const IEPage = () => {
    return (
        <div>
            <div>
                <pre>
                    <h1>Sorry, Econobis werkt niet met uw browser!</h1>
                </pre>
            </div>
            <div>
                <pre>
                    <p>
                        Het lijkt erop dat u met een oudere versie van uw browser werkt of Internet Explorer gebruikt.
                        Kies een andere browser of werk uw browser bij naar de laatste versie.
                    </p>
                </pre>
            </div>
        </div>
    );
};

if (isNotIE) {
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<IEPage />, document.getElementById('root'));
}
