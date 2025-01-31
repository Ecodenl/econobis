import { put, call } from 'redux-saga/effects';
import ContactDetailsAPI from '../../api/contact/ContactDetailsAPI';
import AddressAPI from '../../api/contact/AddressAPI';
import PhoneNumberAPI from '../../api/contact/PhoneNumberAPI';
import EmailAddressAPI from '../../api/contact/EmailAddressAPI';
import ContactNoteAPI from '../../api/contact/ContactNoteAPI';
import AddressEnergySupplierAPI from '../../api/contact/AddressEnergySupplierAPI';
import AddressDongleAPI from '../../api/contact/AddressDongleAPI';
import PortalUserAPI from '../../api/contact/PortalUserAPI';

export function* fetchContactDetailsSaga({ payload }) {
    try {
        yield put({ type: 'IS_LOADING' });
        const contactDetails = yield call(ContactDetailsAPI.getContactDetails, payload);
        yield put({ type: 'FETCH_CONTACT_DETAILS_SUCCESS', contactDetails });
        yield put({ type: 'IS_LOADING_COMPLETE' });
    } catch (error) {
        yield put({ type: 'FETCH_CONTACT_DETAILS_ERROR', error });
        yield put({ type: 'LOADING_ERROR', error });
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

export function* deletePortalUserSaga({ id }) {
    try {
        yield call(PortalUserAPI.deletePortalUser, id);
        yield put({ type: 'DELETE_PORTAL_USER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_PORTAL_USER_ERROR', error });
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

export function* deleteAddressEnergySupplierSaga({ id }) {
    try {
        yield call(AddressEnergySupplierAPI.deleteAddressEnergySupplier, id);
        yield put({ type: 'DELETE_ADDRESS_ENERGY_SUPPLIER_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_ADDRESS_ENERGY_SUPPLIER_ERROR', error });
    }
}

export function* deleteAddressDongleSaga({ id }) {
    try {
        yield call(AddressDongleAPI.deleteAddressDongle, id);
        yield put({ type: 'DELETE_ADDRESS_DONGLE_SUCCESS', id });
    } catch (error) {
        yield put({ type: 'DELETE_ADDRESS_DONGLE_ERROR', error });
    }
}
