import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import RegistrationDetailsFormGeneral from './general/RegistrationDetailsFormGeneral';

class RegistrationDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.registrationDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <RegistrationDetailsFormGeneral />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        registrationDetails: state.registrationDetails,
    };
};

export default connect(mapStateToProps, null)(RegistrationDetailsForm);
