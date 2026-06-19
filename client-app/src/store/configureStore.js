import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import reducers from '../reducers';
import moment from 'moment';

export const configure = (initialState = {}) => {
    const sagaMiddleware =
        typeof createSagaMiddleware === 'function' ? createSagaMiddleware() : createSagaMiddleware.default();

    const checkTokenExpirationMiddleware = store => next => action => {
        const state = store.getState();

        // todo WM: check voor later: of dit wel nodig is en goed gaat?
        const isAuthenticated = state.auth.authenticated;
        const meDetailsLoaded = state.systemData.meDetailsLoaded;
        if (!isAuthenticated || !meDetailsLoaded) {
            // Nog niet ingelogd of data nog niet binnen, dus skip deze check
            return next(action);
        }

        const lastActivity = moment(localStorage.getItem('last_activity'));

        if (!localStorage.getItem('last_activity') || lastActivity.add('30', 'minutes').format() < moment().format()) {
            const path = window.location.pathname;
            if (path !== '/login' && path !== '/loguit') {
                setTimeout(() => {
                    window.location.href = '/#/loguit';
                }, 200);
            }
        } else {
            localStorage.setItem('last_activity', moment().format());
        }
        next(action);
    };

    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(checkTokenExpirationMiddleware, sagaMiddleware),
            process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f
        )
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
