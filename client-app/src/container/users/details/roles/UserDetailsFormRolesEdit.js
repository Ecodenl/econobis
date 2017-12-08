import React, { Component }from 'react';
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
        const {id , roles = {} } = this.props.userDetails;

        return (
            <div>
                <PanelBody>
                    <PanelHeader>
                        <span className="h5 text-bold">Gebruikers rollen</span>
                    </PanelHeader>
                    <div className="row">
                {
                    roles.length === 0 ? (
                        <tr><td colSpan={7}>Geen rollen beschikbaar!</td></tr>
                    ) : (
                        roles.map((role, i) => {

                            return <UserDetailsFormRoleEditItem
                                key={i}
                                role={role}
                                id={id}
                            />
                        })
                    )
                }
                    </div>
                    <PanelFooter>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        </div>
                    </PanelFooter>
                </PanelBody>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps, null)(UserDetailsFormRolesEdit);