import {
    setNumberFilter,
    setTypeFilter,
    setFullNameFilter,
    setStreetAndNumberFilter,
    setPostalCodeFilter,
    setCityFilter,
    setEmailAddressFilter,
} from '../../actions/contact/ContactsActions';

test('should set number filter', () => {
    const action = setNumberFilter();

    expect(action).toEqual({
        type: 'SET_NUMBER_FILTER',
    });
});
