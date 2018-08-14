import { put, call } from 'redux-saga/effects';
import ContactDetailsAPI from '../../api/contact/ContactDetailsAPI';
import AddressAPI from '../../api/contact/AddressAPI';
import PhoneNumberAPI from '../../api/contact/PhoneNumberAPI';
import EmailAddressAPI from '../../api/contact/EmailAddressAPI';
import ContactNoteAPI from '../../api/contact/ContactNoteAPI';
import ContactEnergySupplierAPI from '../../api/contact/ContactEnergySupplierAPI';
import {authSaga} from "../general/AuthSaga";

export function* fetchContactDetailsSaga({ payload }) {
    try {
        //yield call(authSaga);
        const contactDetails = yield call(ContactDetailsAPI.getContactDetails, payload);
        yield put({ type: 'FETCH_CONTACT_DETAILS_SUCCESS', contactDetails });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_DETAILS_ERROR', error });
    }
}

export function* deleteAddressSaga({ id }) {
    try {
        yield call(AddressAPI.deleteAddress, id);
        yield put({ type: 'DELETE_ADDRESS_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'SET_ERROR', http_code: error.response.status, message: error.response.data.message });
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
        yield put({ type: 'DELETE_CONTACT_NOTE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_NOTE_ERROR', error });
    }
}

export function* deleteContactEnergySupplierSaga({ id }) {
    try {
        yield call(ContactEnergySupplierAPI.deleteContactEnergySupplier, id);
        yield put({ type: 'DELETE_CONTACT_ENERGY_SUPPLIER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_CONTACT_ENERGY_SUPPLIER_ERROR', error });
    }
}