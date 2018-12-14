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
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van intake.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.intakeDetails)) {
            loadingText = 'Geen intake gevonden!';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
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
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps, null)(IntakeDetailsForm);
