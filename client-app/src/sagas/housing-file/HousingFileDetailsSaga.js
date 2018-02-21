import { put, call } from 'redux-saga/effects';
import HousingFileDetailsAPI from '../../api/housing-file/HousingFileDetailsAPI';

export function* fetchHousingFileDetailsSaga({ payload }) {
    try {
        const housingFileDetails = yield call(HousingFileDetailsAPI.fetchHousingFilesDetails, payload);
        yield put({ type: 'FETCH_HOUSING_FILE_DETAILS_SUCCESS', housingFileDetails });
    } catch (error) {
        yield put({ type: 'FETCH_HOUSING_FILE_DETAILS_ERROR', error });
    }
}

export function* deleteHousingFileSaga({ id }) {
    try {
        yield call(HousingFileDetailsAPI.deleteHousingFile, id);
        yield put({ type: 'DELETE_HOUSING_FILE_SUCCESS', id });
    } catch (error) {
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