import React from 'react';
import { shallow } from 'enzyme';

import InputSelect from '../../../components/form/InputSelect';
const options = [{id: 1, name: 'optie 1'}, {id: 2, name: 'optie 2'}, {id: 3, name: 'optie 3'}];

test('should render InputSelect correctly', () => {
    const wrapper = shallow(<InputSelect options={options} label={"Naam"} value={1}/>);
    expect(wrapper).toMatchSnapshot();
});