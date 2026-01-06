import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchTeamDetails } from '../../../actions/team/TeamDetailsActions';
import TeamDetailsFormGeneral from './general/TeamDetailsFormGeneral';
import TeamDetailsUsers from './team-users/TeamDetailsUsers';
import TeamDetailsContactGroups from './team-contact-groups/TeamDetailsContactGroups';
import TeamDetailsDistricts from './team-district/TeamDetailsDistricts';
import TeamDetailsDocumentCreatedFroms from './team-document-created-from/TeamDetailsDocumentCreatedFroms';

class TeamDetailsFrom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van team.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.teamDetails)) {
            loadingText = 'Geen team gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <TeamDetailsFormGeneral />
                <TeamDetailsUsers />
                <TeamDetailsContactGroups />
                <TeamDetailsDocumentCreatedFroms />
                <TeamDetailsDistricts />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teamDetails: state.teamDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTeamDetails: id => {
        dispatch(fetchTeamDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsFrom);
