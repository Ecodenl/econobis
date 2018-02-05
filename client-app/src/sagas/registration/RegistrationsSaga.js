import { put, call } from 'redux-saga/effects';
import RegistrationsAPI from '../../api/registration/RegistrationsAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchRegistrationsSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_REGISTRATIONS_LOADING' });
        const registrations = yield call(RegistrationsAPI.fetchRegistrations, {filters, sorts, pagination});
        yield put({ type: 'FETCH_REGISTRATIONS_SUCCESS', registrations });
    } catch (error) {
        yield put({ type: 'FETCH_REGISTRATIONS_ERROR', error });
    }
}