import { put, call } from 'redux-saga/effects';
import HousingFilesAPI from '../../api/housing-file/HousingFilesAPI';

export function* fetchHousingFilesSaga({filters, sorts, pagination}) {
    try {
        //yield call(authSaga);
        yield put({ type: 'FETCH_HOUSING_FILES_LOADING' });
        const housingFiles = yield call(HousingFilesAPI.fetchHousingFiles, {filters, sorts, pagination});
        yield put({ type: 'FETCH_HOUSING_FILES_SUCCESS', housingFiles });
    } catch (error) {
        yield put({ type: 'FETCH_HOUSING_FILES_ERROR', error });
    }
}