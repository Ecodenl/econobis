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

        const additionalRolesList = [
            'Beheerder webformulier',
            'Beheerder Mailgun domeinen',
            'Beheerder portal instellingen',
            'Beheerder coöperatie instellingen',
            'Data opschoner',
        ];

        // Rollen die vallen onder "extra beheerrechten"
        const rolesAdditionalPermissions = roles.filter(role => additionalRolesList.includes(role.name));

        // De overige rollen
        const rolesUserPermissions = roles.filter(role => !additionalRolesList.includes(role.name));

        const hasKeyUserRole = this.props.keyUserRole && Boolean(this.props.keyUserRole.hasRole) === true;

        return (
            <div onClick={this.props.switchToEdit}>
                <PanelBody>
                    <PanelHeader>
                        <span className="h5 text-bold">Gebruikers rollen</span>
                    </PanelHeader>
                    <div className="row">
                        {rolesUserPermissions.length === 0 ? (
                            <tr>
                                <td colSpan={7}>Geen rollen beschikbaar!</td>
                            </tr>
                        ) : (
                            rolesUserPermissions.map((role, i) => {
                                return <UserDetailsFormRoleViewItem key={i} role={role} alwaysTrue={false} />;
                            })
                        )}
                    </div>
                    <PanelHeader>
                        <span className="h5 text-bold">Gebruikers aanvullende rechten</span>
                    </PanelHeader>
                    <div className="row">
                        {rolesAdditionalPermissions.length === 0 ? (
                            <tr>
                                <td colSpan={7}>Geen aanvullende rechten beschikbaar!</td>
                            </tr>
                        ) : (
                            rolesAdditionalPermissions.map((role, i) => {
                                return <UserDetailsFormRoleViewItem key={i} role={role} alwaysTrue={hasKeyUserRole} />;
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
        keyUserRole: state.userDetails.roles.find(role => role.name === 'Beheerder'),
    };
};

export default connect(mapStateToProps)(UserDetailsFormRolesView);
