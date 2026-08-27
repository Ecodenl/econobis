import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchUserDetails } from '../../../actions/user/UserDetailsActions';
import UserDetailsFormGeneral from './general/UserDetailsFormGeneral';
import UserDetailsFormLog from './log/UserDetailsFormLog';
import UserDetailsFormRoles from './roles/UserDetailsFormRoles';
import UserDetailsFormTeams from './teams/UserDetailsFormTeams';
import UserDetailsFormTwoFactor from './two-factor/UserDetailsFormTwoFactor';
import UserDetailsFormMailbox from './mailbox/UserDetailsFormMailbox';

class UserDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { permissions = {} } = this.props.meDetails;

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van gebruiker.';
        } else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        } else if (isEmpty(this.props.userDetails)) {
            loadingText = 'Geen gebruiker gevonden!';
        } else {
            loading = false;
        }

        return loading ? (
            <div>{loadingText}</div>
        ) : (
            <div>
                <UserDetailsFormGeneral />
                {permissions.manageCooperationSettings ? <UserDetailsFormTwoFactor /> : null}
                <UserDetailsFormMailbox />
                <UserDetailsFormRoles />
                <UserDetailsFormTeams />
                <UserDetailsFormLog />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        userDetails: state.userDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUserDetails: id => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm);
