import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserDetailsFormRoleViewItem from './UserDetailsFormRoleViewItem';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';

class UserDetailsFormRolesView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { roles = {} } = this.props.userDetails;

        return (
            <div onClick={this.props.switchToEdit}>
                <PanelBody>
                    <PanelHeader>
                        <span className="h5 text-bold">Gebruikers rollen</span>
                    </PanelHeader>
                    <div className="row">
                        {roles.length === 0 ? (
                            <tr>
                                <td colSpan={7}>Geen rollen beschikbaar!</td>
                            </tr>
                        ) : (
                            roles.map((role, i) => {
                                return <UserDetailsFormRoleViewItem key={i} role={role} />;
                            })
                        )}
                    </div>
                </PanelBody>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(UserDetailsFormRolesView);
