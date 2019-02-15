import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import MutationForm from './mutation/MutationForm';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';

class ParticipantDetailsForm extends Component {
    render() {
        let loadingText = '';
        let loading = true;
        let projectTypeCodeRef = '';

        if (this.props.participantProject.project) {
            projectTypeCodeRef = this.props.participantProject.project.projectType.codeRef;
        }

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van deelnemers.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.participantProject)) {
            loadingText = 'Geen deelnemers gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ParticipantFormGeneral />
                <MutationForm />

                {projectTypeCodeRef === 'obligation' ? <ObligationNumberForm /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
