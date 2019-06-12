import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';
import MutationForm from './mutation/list/MutationForm';
import ParticipantDetailsConclusion from './conclusion';

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
        } else if (this.props.isLoading && !this.props.participantProject.id) {
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
                <ParticipantDetailsConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        participantProject: state.participantProjectDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
        keyUserRole: state.meDetails.roles.find(role => role.name === 'Key user'),
    };
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
