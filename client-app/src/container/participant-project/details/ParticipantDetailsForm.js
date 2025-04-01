import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import ParticipantFormGeneral from './form/ParticipantFormGeneral';
import ObligationNumberForm from './obligation-number/ObligationNumberForm';
import MutationForm from './mutation/list/MutationForm';
import ParticipantDetailsConclusion from './conclusion';
import RevenuesListForm from './revenue/RevenuesListForm';
import RevenuesKwhListForm from './revenueKwh/RevenuesKwhListForm';

class ParticipantDetailsForm extends Component {
    render() {
        let loadingText = '';
        let loading = true;
        let projectTypeCodeRef = '';

        if (this.props.participantProject.project) {
            projectTypeCodeRef = this.props.participantProject.project.typeCodeRef;
        }

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van deelnemer.';
        } else if (this.props.isLoading && !this.props.participantProject.id) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.participantProject)) {
            loadingText = 'Geen deelnemer gevonden!';
        } else {
            loading = false;
        }
        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <ParticipantFormGeneral />
                <>
                    <RevenuesListForm />
                    {this.props.participantProject.project &&
                    this.props.participantProject.project.typeCodeRef === 'postalcode_link_capital' ? (
                        <RevenuesKwhListForm />
                    ) : null}
                </>

                <MutationForm isTerminated={Boolean(this.props.participantProject.dateTerminated)} />
                {projectTypeCodeRef === 'obligation' ? <ObligationNumberForm /> : null}
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
        keyUserRole: state.meDetails.roles.find(role => role.name === 'Beheerder'),
    };
};

export default connect(mapStateToProps)(ParticipantDetailsForm);
