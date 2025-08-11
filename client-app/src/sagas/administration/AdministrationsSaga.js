import { put, call } from 'redux-saga/effects';
import AdministrationsAPI from '../../api/administration/AdministrationsAPI';
import AdministrationDetailsAPI from '../../api/administration/AdministrationDetailsAPI';

export function* fetchAdministrationsSaga() {
    try {
        yield put({ type: 'IS_LOADING' });
        const administrations = yield call(AdministrationsAPI.fetchAdministrations);
        yield put({ type: 'FETCH_ADMINISTRATIONS_SUCCESS', administrations });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_ADMINISTRATIONS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteAdministrationSaga({ id }) {
    try {
        yield call(AdministrationDetailsAPI.deleteAdministration, id);
        yield put({ type: 'DELETE_ADMINISTRATION_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_ADMINISTRATION_ERROR', error });
    }
}
