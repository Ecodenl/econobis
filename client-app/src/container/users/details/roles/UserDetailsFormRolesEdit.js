import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserDetailsFormRoleEditItem from './UserDetailsFormRoleEditItem';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import PanelFooter from '../../../../components/panel/PanelFooter';
import ButtonText from '../../../../components/button/ButtonText';

class UserDetailsFormRolesEdit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, roles = {} } = this.props.userDetails;

        const additionalRolesList = [
            'Beheerder webformulier',
            'Beheerder Mailgun domeinen',
            'Beheerder Portal Settings',
            'Beheerder coöperatie instellingen',
            'Data opschoner',
        ];

        // Rollen die vallen onder "extra beheerrechten"
        const rolesAdditionalPermissions = roles.filter(role => additionalRolesList.includes(role.name));

        // De overige rollen
        const rolesUserPermissions = roles.filter(role => !additionalRolesList.includes(role.name));

        const hasKeyUserRole = this.props.keyUserRole && Boolean(this.props.keyUserRole.hasRole) === true;

        return (
            <div>
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
                                return <UserDetailsFormRoleEditItem key={i} role={role} id={id} alwaysTrue={false} />;
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
                                return (
                                    <UserDetailsFormRoleEditItem
                                        key={i}
                                        role={role}
                                        id={id}
                                        alwaysTrue={hasKeyUserRole}
                                    />
                                );
                            })
                        )}
                    </div>
                    <PanelFooter>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                        </div>
                    </PanelFooter>
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

export default connect(mapStateToProps, null)(UserDetailsFormRolesEdit);
