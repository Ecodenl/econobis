import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';
import MutationForm from './mutation/list/MutationForm';
import ParticipantDetailsConclusion from './conclusion';
import RevenuesListForm from './revenue/list/RevenuesListForm';

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
                <MutationForm isTerminated={Boolean(this.props.participantProject.dateTerminated)} />
                {projectTypeCodeRef === 'obligation' ? <ObligationNumberForm /> : null}
                {this.props.project &&
                this.props.project.projectStatus &&
                this.props.project.projectStatus.codeRef !== 'concept' &&
                projectTypeCodeRef === 'postalcode_link_capital' ? (
                    <RevenuesListForm
                        projectId={this.props.project.id}
                        participationId={this.props.participantProject.id}
                    />
                ) : null}
                <ParticipantDetailsConclusion />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        participantProject: state.participantProjectDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
        keyUserRole: state.meDetails.roles.find(role => role.name === 'Key user'),
    };
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
