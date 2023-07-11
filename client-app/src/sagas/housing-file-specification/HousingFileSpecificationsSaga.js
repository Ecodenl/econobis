import { put, call } from 'redux-saga/effects';
import HousingFileSpecificationsAPI from '../../api/housing-file-specification/HousingFileSpecificationsAPI';

export function* fetchHousingFileSpecificationsSaga({ filters, sorts, pagination }) {
    try {
        yield put({ type: 'IS_LOADING' });
        yield put({ type: 'FETCH_HOUSING_FILE_SPECIFICATIONS_LOADING' });
        const housingFileSpecifications = yield call(HousingFileSpecificationsAPI.fetchHousingFileSpecifications, {
            filters,
            sorts,
            pagination,
        });
        yield put({ type: 'FETCH_HOUSING_FILE_SPECIFICATIONS_SUCCESS', housingFileSpecifications });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_HOUSING_FILE_SPECIFICATIONS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
    }
}
