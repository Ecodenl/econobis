import { put, call } from 'redux-saga/effects';
import HousingFileDetailsAPI from '../../api/housing-file/HousingFileDetailsAPI';
// import { useNavigate } from 'react-router-dom';

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
    // const navigate = useNavigate();

    try {
        yield call(HousingFileDetailsAPI.deleteHousingFile, id);
        yield put({ type: 'DELETE_HOUSING_FILE_SUCCESS', id });
        // todo WM: verplaatsen !!!
        // navigate(`/woningdossiers`);
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
        yield put({ type: 'DELETE_HOUSING_FILE_ERROR', error });
    }
}

export function* deleteHousingFileSpecificationSaga({ housingFileSpecificationId }) {
    try {
        yield call(HousingFileDetailsAPI.deleteHousingFileSpecification, housingFileSpecificationId);
        yield put({ type: 'DELETE_HOUSING_FILE_SPECIFICATION_SUCCESS', housingFileSpecificationId });
    } catch (error) {
        yield put({ type: 'DELETE_HOUSING_FILE_SPECIFICATION_ERROR', error });
    }
}

export function* deleteHousingFileHousingStatusSaga({ housingFileHousingStatusId }) {
    try {
        yield call(HousingFileDetailsAPI.deleteHousingFileHousingStatus, housingFileHousingStatusId);
        yield put({ type: 'DELETE_HOUSING_FILE_HOUSING_STATUS_SUCCESS', housingFileHousingStatusId });
    } catch (error) {
        yield put({ type: 'DELETE_HOUSING_FILE_HOUSING_STATUS_ERROR', error });
    }
}
