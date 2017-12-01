import { put, call } from 'redux-saga/effects';
import RegistrationsAPI from '../api/registration/RegistrationsAPI';

export function* fetchRegistrationsSaga({filters, sorts}) {
    try {
        const registrations = yield call(RegistrationsAPI.fetchRegistrations, {filters, sorts});

        yield [
            put({ type: 'FETCH_REGISTRATIONS_SUCCESS', registrations }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_REGISTRATIONS_ERROR', error });
    }
}