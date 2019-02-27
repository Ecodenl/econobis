import contactsReducer from '../../reducers/contact/ContactsListReducer';
import contacts from './../fixtures/contacts';

test('should set default state', () => {
    const state = contactsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should get contacts', () => {
    const action = {
        type: 'GET_CONTACTS',
        contacts,
    };

    const state = contactsReducer(contacts, action);
    expect(state).toEqual(contacts);
});
