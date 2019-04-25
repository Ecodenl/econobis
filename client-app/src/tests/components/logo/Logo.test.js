import React from 'react';
import { shallow } from 'enzyme';

import Logo from '../../../components/logo/Logo';

test('should render Logo correctly', () => {
    const wrapper = shallow(<Logo height={'100px'} />);
    expect(wrapper).toMatchSnapshot();
});
