import { put, call } from 'redux-saga/effects';
import PostalCodeLinkAPI from '../../api/postal-code-link/PostalCodeLinkAPI';

export function* fetchPostalCodeLinksSaga() {
    try {
        const postalCodeLinks = yield call(PostalCodeLinkAPI.fetchPostalCodeLinks);
        yield put({ type: 'FETCH_POSTAL_CODE_LINKS_SUCCESS', postalCodeLinks });
    } catch (error) {
        yield put({ type: 'FETCH_POSTAL_CODE_LINKS_ERROR', error });
    }
}

export function* deletePostalCodeLinkSaga({ id }) {
    try {
        yield call(PostalCodeLinkAPI.deletePostalCodeLink, id);
        yield put({ type: 'DELETE_POSTAL_CODE_LINK_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_POSTAL_CODE_LINK_ERROR', error });
    }
}