import { put, call } from 'redux-saga/effects';
import HousingFileDetailsAPI from '../../api/housing-file/HousingFileDetailsAPI';
import {hashHistory} from "react-router";

export function* fetchHousingFileDetailsSaga({ payload }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const housingFileDetails = yield call(HousingFileDetailsAPI.fetchHousingFilesDetails, payload);
        yield put({ type: 'FETCH_HOUSING_FILE_DETAILS_SUCCESS', housingFileDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_HOUSING_FILE_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}

export function* deleteHousingFileSaga({ id }) {
    try {
        yield call(HousingFileDetailsAPI.deleteHousingFile, id);
        yield put({ type: 'DELETE_HOUSING_FILE_SUCCESS', id });
        hashHistory.push(`/woningdossiers`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_HOUSING_FILE_ERROR', error });
    }
}

export function* deleteHousingFileMeasureTakenSaga({ addressId, measureId }) {
    try {
        yield call(HousingFileDetailsAPI.detachMeasureTaken, addressId, measureId);
        yield put({ type: 'DELETE_HOUSING_FILE_MEASURE_TAKEN_SUCCESS', measureId });
    } catch (error) {
        yield put({ type: 'DELETE_HOUSING_FILE_MEASURE_TAKEN_ERROR', error });
    }
}