import { put, call } from 'redux-saga/effects';
import ContactDetailsAPI from '../../api/contact/ContactDetailsAPI';
import AddressAPI from '../../api/contact/AddressAPI';
import PhoneNumberAPI from '../../api/contact/PhoneNumberAPI';
import EmailAddressAPI from '../../api/contact/EmailAddressAPI';
import ContactNoteAPI from '../../api/contact/ContactNoteAPI';

export function* fetchContactDetailsSaga({ payload }) {
    try {
        const contactDetails = yield call(ContactDetailsAPI.getContactDetails, payload);
        yield [
            put({ type: 'FETCH_CONTACT_DETAILS_SUCCESS', contactDetails }),
        ];
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_DETAILS_ERROR', error });
    }
}

export function* deleteAddressSaga({ id }) {
    try {
        yield call(AddressAPI.deleteAddress, id);
        yield put({ type: 'DELETE_ADDRESS_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_ADDRESS_ERROR', error });
    }
}

export function* deletePhoneNumberSaga({ id }) {
    try {
        yield call(PhoneNumberAPI.deletePhoneNumber, id);
        yield put({ type: 'DELETE_PHONE_NUMBER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_PHONE_NUMBER_ERROR', error });
    }
}

export function* deleteEmailAddressSaga({ id }) {
    try {
        yield call(EmailAddressAPI.deleteEmailAddress, id);
        yield put({ type: 'DELETE_EMAIL_ADDRESS_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_EMAIL_ADDRESS_ERROR', error });
    }
}

export function* deleteContactNoteSaga({ id }) {
    try {
        yield call(ContactNoteAPI.deleteNote, id);
        yield put({ type: 'DELETE_NOTE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_NOTE_ERROR', error });
    }
}