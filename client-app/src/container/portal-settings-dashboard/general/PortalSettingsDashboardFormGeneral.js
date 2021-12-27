import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import PortalSettingsDashboardFormGeneralEdit from './PortalSettingsDashboardFormGeneralEdit';
import PortalSettingsDashboardFormGeneralView from './PortalSettingsDashboardFormGeneralView';
import ErrorUnauthorized from '../../global/ErrorUnauthorized';

class PortalSettingsDashboardFormGeneral extends Component {
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

        if (!permissions.managePortalSettings) {
            return <ErrorUnauthorized />;
        }

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.managePortalSettings ? (
                    <PortalSettingsDashboardFormGeneralEdit
                        dashboardSettings={this.props.dashboardSettings}
                        updateState={this.props.updateState}
                        meDetails={this.props.meDetails}
                        switchToView={this.switchToView}
                    />
                ) : isEmpty(this.props.dashboardSettings) ? (
                    <p>Nog geen dashboard instellingen opgeslagen.</p>
                ) : (
                    <PortalSettingsDashboardFormGeneralView
                        {...this.props.dashboardSettings}
                        switchToEdit={this.switchToEdit}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(PortalSettingsDashboardFormGeneral);
