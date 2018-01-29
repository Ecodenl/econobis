import { put, call } from 'redux-saga/effects';
import RegistrationsAPI from '../../api/registration/RegistrationsAPI';

export function* fetchRegistrationsSaga({filters, sorts, pagination}) {
    try {
        yield put({ type: 'FETCH_REGISTRATIONS_LOADING' });
        const registrations = yield call(RegistrationsAPI.fetchRegistrations, {filters, sorts, pagination});
        yield put({ type: 'FETCH_REGISTRATIONS_SUCCESS', registrations });
    } catch (error) {
        yield put({ type: 'FETCH_REGISTRATIONS_ERROR', error });
    }
}