import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchUserDetails } from '../../../actions/UserDetailsActions';
import UserDetailsFormGeneral from './general/UserDetailsFormGeneral';
import UserDetailsFormLog from './log/UserDetailsFormLog';
import UserDetailsFormRoles from './roles/UserDetailsFormRoles';

class UserDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            isEmpty(this.props.userDetails) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <UserDetailsFormGeneral />
                    <UserDetailsFormRoles/>
                    <UserDetailsFormLog />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUserDetails: (id) => {
        dispatch(fetchUserDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm);
