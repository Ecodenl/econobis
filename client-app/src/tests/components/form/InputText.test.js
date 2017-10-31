import React from 'react';
import { shallow } from 'enzyme';
import InputText from '../../../components/form/InputText';

test('should render InputText correctly', () => {
    const wrapper = shallow(<InputText label={"Naam"} name={"naam"} value={"Rob"}/>);
    expect(wrapper).toMatchSnapshot();
});