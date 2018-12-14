import { put, call } from 'redux-saga/effects';
import WebformDetailsAPI from '../../api/webform/WebformDetailsAPI';

export function* fetchWebformDetailsSaga({ id }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const webformDetails = yield call(WebformDetailsAPI.fetchWebformDetails, id);
        yield put({ type: 'FETCH_WEBFORM_DETAILS_SUCCESS',webformDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_WEBFORM_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

// Update webform details and switch to view callback
export function* updateWebformDetailsSaga({ webform, switchToView }) {
    try {
        const payload = yield call(WebformDetailsAPI.updateWebform, webform);
        const webformDetails = payload.data.data;

        yield put({ type: 'UPDATE_WEBFORM_SUCCESS', webformDetails });

        // Reload system data after updating webform
        yield put({ type: 'FETCH_SYSTEM_DATA'});
        // Switch back to view callback fn
        yield switchToView();
    } catch (error) {
        yield put({ type: 'UPDATE_WEBFORM_DETAILS_ERROR', error });
    }
}
