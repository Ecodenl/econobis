import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import RegistrationDetailsFormGeneral from './general/RegistrationDetailsFormGeneral';
import RegistrationMeasuresTaken from './measures-taken/RegistrationMeasuresTaken';
import RegistrationDetailsFormNote from './note/RegistrationDetailsFormNote';
import RegistrationMeasuresRequested from "./measures-requested/RegistrationMeasuresRequested";
import RegistrationDetailsFormConclusion from "./conclusion/RegistrationDetailsFormConclusion";

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
                    <RegistrationMeasuresTaken />
                    <RegistrationMeasuresRequested />
                    <RegistrationDetailsFormNote />
                    <RegistrationDetailsFormConclusion />
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
