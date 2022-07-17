import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalSettingsDashboardWidgetFormGeneralEdit from './PortalSettingsDashboardWidgetFormGeneralEdit';
import PortalSettingsDashboardWidgetFormGeneralView from './PortalSettingsDashboardWidgetFormGeneralView';
import ErrorUnauthorized from '../../../../global/ErrorUnauthorized';

class PortalSettingsDashboardWidgetFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageHash: Date.now(),
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
            imageHash: Date.now(),
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
                    <PortalSettingsDashboardWidgetFormGeneralEdit
                        portalSettingsDashboardWidget={this.props.portalSettingsDashboardWidget}
                        dashboardSettings={this.props.dashboardSettings}
                        contactGroups={this.props.contactGroups}
                        isLoading={this.props.isLoading}
                        updateState={this.props.updateState}
                        switchToView={this.switchToView}
                        imageHash={this.state.imageHash}
                    />
                ) : (
                    <PortalSettingsDashboardWidgetFormGeneralView
                        {...this.props.portalSettingsDashboardWidget}
                        switchToEdit={this.switchToEdit}
                        imageHash={this.state.imageHash}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // permissions: state.meDetails.permissions,
        meDetails: state.meDetails,
        portalSettingsDashboardWidgets: state.systemData.portalSettingsDashboardWidgets,
    };
};

export default connect(mapStateToProps)(PortalSettingsDashboardWidgetFormGeneral);
