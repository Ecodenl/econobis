import React from 'react';
import { shallow } from 'enzyme';
import ContactsList from '../../../container/contact/list/ContactsList';
import contacts from '../../fixtures/contacts';

test('should render ContactsList with empty message', () => {
    const wrapper = shallow(<ContactsList contacts={[]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ContactsList with contacts', () => {
    const wrapper = shallow(<ContactsList contacts={contacts} />);
    expect(wrapper).toMatchSnapshot();
});
