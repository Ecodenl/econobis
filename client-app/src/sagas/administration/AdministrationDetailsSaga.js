import { put, call } from 'redux-saga/effects';
import AdministrationDetailsAPI from '../../api/administration/AdministrationDetailsAPI';

export function* fetchAdministrationDetailsSaga({ id }) {
    try {
        const administrationDetails = yield call(AdministrationDetailsAPI.fetchAdministrationDetails, id);
        yield put({ type: 'FETCH_ADMINISTRATION_DETAILS_SUCCESS',administrationDetails });
    } catch (error) {
        yield put({ type: 'FETCH_ADMINISTRATION_DETAILS_ERROR', error });
    }
}

export function* updateAdministrationDetailsSaga({ administration, administrationId, switchToView }) {
    try {
        const payload = yield call(AdministrationDetailsAPI.updateAdministration, {administration, administrationId});
        const administrationDetails = payload.data.data;

        // Reload me details after updating administration
        yield put({ type: 'FETCH_ME_DETAILS'});

        yield put({ type: 'UPDATE_ADMINISTRATION_SUCCESS', administrationDetails });

        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_ADMINISTRATION_DETAILS_ERROR', error });
    }
}

export function* addAdministrationUserSaga({administrationUser}) {
    try {
        const payload = yield call(AdministrationDetailsAPI.attachUser, administrationUser);

        const administrationUserPayload = payload.data.data;

        // Reload me details after updating administration
        yield put({ type: 'FETCH_ME_DETAILS'});

        yield put({ type: 'ADD_ADMINISTRATION_USER_SUCCESS', administrationUserPayload });
    } catch (error) {
        yield put({ type: 'ADD_ADMINISTRATION_USER_ERROR', error });
    }
}

export function* deleteAdministrationUserSaga({administrationId, userId }) {
    try {
        yield call(AdministrationDetailsAPI.detachUser, {administrationId, userId });
        yield put({ type: 'DELETE_ADMINISTRATION_USER_SUCCESS', userId });
    } catch (error) {
        yield put({ type: 'DELETE_ADMINISTRATION_USER_ERROR', error });
    }
}