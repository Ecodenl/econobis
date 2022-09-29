import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserDetailsFormTwoFactorEdit from './UserDetailsFormTwoFactorEdit';
import UserDetailsFormTwoFactorView from './UserDetailsFormTwoFactorView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from "../../../../components/panel/PanelHeader";

class UserDetailsFormTwoFactor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelHeader>
                    <span className="h5 text-bold">Twee factor authenticatie</span>
                </PanelHeader>
                <PanelBody>
                    {this.state.showEdit && permissions.manageUser ? (
                        <UserDetailsFormTwoFactorEdit switchToView={this.switchToView} requiredByCooperation={this.props.cooperation.require_two_factor_authentication} />
                    ) : (
                        <UserDetailsFormTwoFactorView switchToEdit={this.switchToEdit} requiredByCooperation={this.props.cooperation.require_two_factor_authentication} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        meDetails: state.meDetails,
        cooperation: state.systemData.cooperation,
    };
};

export default connect(mapStateToProps)(UserDetailsFormTwoFactor);
