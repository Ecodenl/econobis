import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import IntakeDetailsFormGeneral from './general/IntakeDetailsFormGeneral';
import IntakeMeasuresRequested from "./measures-requested/IntakeMeasuresRequested";
import IntakeDetailsFormConclusion from "./conclusion/IntakeDetailsFormConclusion";
import IntakeDetailsOpportunities from "./opportunities/IntakeDetailsOpportunities";

class IntakeDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.intakeDetails) ?
                <div>Geen gegevens gevonden.</div>
                :
                <div>
                    <IntakeDetailsFormGeneral />
                    <IntakeMeasuresRequested />
                    <IntakeDetailsOpportunities />
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
