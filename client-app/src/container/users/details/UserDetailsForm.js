import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchUserDetails } from '../../../actions/user/UserDetailsActions';
import UserDetailsFormGeneral from './general/UserDetailsFormGeneral';
import UserDetailsFormLog from './log/UserDetailsFormLog';
import UserDetailsFormRoles from './roles/UserDetailsFormRoles';
import UserDetailsFormTwoFactor from './two-factor/UserDetailsFormTwoFactor';

class UserDetailsForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                <UserDetailsFormTwoFactor />
                <UserDetailsFormRoles />
                <UserDetailsFormLog />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
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
