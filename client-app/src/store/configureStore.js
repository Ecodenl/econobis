import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import reducers from '../reducers';

export const configure = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducers, initialState, compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    sagaMiddleware.run(rootSaga);

    return store;
};
