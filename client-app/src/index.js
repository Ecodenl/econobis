import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './router';
import './styles/style.scss';
import 'babel-polyfill';

import * as authActions from './actions/AuthActions';

const store = require('./store/configureStore').configure();

const token = localStorage.getItem('access_token');

if(token) {
    store.dispatch(authActions.authSuccess());
}

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
