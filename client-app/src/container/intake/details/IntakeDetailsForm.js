import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import IntakeDetailsFormGeneral from './general/IntakeDetailsFormGeneral';
import IntakeMeasuresTaken from './measures-taken/IntakeMeasuresTaken';
import IntakeDetailsFormNote from './note/IntakeDetailsFormNote';
import IntakeMeasuresRequested from "./measures-requested/IntakeMeasuresRequested";
import IntakeDetailsFormConclusion from "./conclusion/IntakeDetailsFormConclusion";

class IntakeDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.intakeDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <IntakeDetailsFormGeneral />
                    <IntakeMeasuresTaken />
                    <IntakeMeasuresRequested />
                    <IntakeDetailsFormNote />
                    <IntakeDetailsFormConclusion />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        intakeDetails: state.intakeDetails,
    };
};

export default connect(mapStateToProps, null)(IntakeDetailsForm);
