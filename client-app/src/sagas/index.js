import { fork } from 'redux-saga/effects';
import watchSagas from './watcher';

// Here, we register our watcher saga(s) and export as a single generator
// function (rootSaga) as our root Saga.
export default function* rootSaga() {
    yield fork(watchSagas);
}
