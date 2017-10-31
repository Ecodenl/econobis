import { fetchContacts, clearContacts, setCheckedContact, setCheckedContactAll, deleteContact, deleteSelectedContacts } from '../../actions/ContactsActions';

test('should get contacts', () => {
    const action = fetchContacts();

    expect(action).toEqual({
        type: 'FETCH_CONTACTS'
    });
});

test('should clear contacts', () => {
    const action = clearContacts();

    expect(action).toEqual({
        type: 'CLEAR_CONTACTS'
    });
});

test('should set checked contact', () => {
    const id = 1;
    const action = setCheckedContact(id);

    expect(action).toEqual({
        type: 'SET_CHECKED_CONTACT',
        id
    });
});

test('should set checked all contacts', () => {
    const checkedValue = true;
    const action = setCheckedContactAll(checkedValue);

    expect(action).toEqual({
        type: 'SET_CHECKED_CONTACT_ALL',
        checkedValue
    });
});

test('should delete contact', () => {
    const id = 1;
    const action = deleteContact(id);

    expect(action).toEqual({
        type: 'DELETE_CONTACT',
        id
    });
});

test('should delete selected contact', () => {
    const action = deleteSelectedContacts();

    expect(action).toEqual({
        type: 'DELETE_SELECTED_CONTACTS',
    });
});