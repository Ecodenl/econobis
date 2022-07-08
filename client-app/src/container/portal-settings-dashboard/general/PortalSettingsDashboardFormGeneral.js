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
            imageHash: Date.now(),
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        // todo wm: opschonen
        // console.log('switchToEdit');
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        // todo wm: opschonen
        // console.log('switchToView');
        this.setState({
            showEdit: false,
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
                        switchToView={this.switchToView}
                        imageHash={this.state.imageHash}
                        // todo WM: opschonen
                        // meDetails={this.props.meDetails}
                        // switchToEdit={this.switchToEdit}
                    />
                ) : isEmpty(this.props.dashboardSettings) ? (
                    <p>Nog geen dashboard instellingen opgeslagen.</p>
                ) : (
                    <PortalSettingsDashboardFormGeneralView
                        dashboardSettings={this.props.dashboardSettings}
                        updateState={this.props.updateState}
                        switchToEdit={this.switchToEdit}
                        imageHash={this.state.imageHash}
                        // todo WM: opschonen
                        // switchToView={this.switchToView}
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
    };
};

export default connect(mapStateToProps)(PortalSettingsDashboardFormGeneral);
