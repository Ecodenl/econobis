import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalSettingsLayoutFormGeneralEdit from './PortalSettingsLayoutFormGeneralEdit';
import PortalSettingsLayoutFormGeneralView from './PortalSettingsLayoutFormGeneralView';
import ErrorUnauthorized from '../../../global/ErrorUnauthorized';

class PortalSettingsLayoutFormGeneral extends Component {
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
                    <PortalSettingsLayoutFormGeneralEdit
                        portalSettingsLayout={this.props.portalSettingsLayout}
                        portalSettingsLayouts={this.props.portalSettingsLayouts}
                        switchToView={this.switchToView}
                        updateState={this.props.updateState}
                        meDetails={this.props.meDetails}
                        imageHash={this.state.imageHash}
                    />
                ) : (
                    <PortalSettingsLayoutFormGeneralView
                        {...this.props.portalSettingsLayout}
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
        portalSettingsLayouts: state.systemData.portalSettingsLayouts,
    };
};

export default connect(mapStateToProps)(PortalSettingsLayoutFormGeneral);
