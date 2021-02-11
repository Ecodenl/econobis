import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalSettingsLayoutFormGeneralEdit from './PortalSettingsLayoutFormGeneralEdit';
import PortalSettingsLayoutFormGeneralView from './PortalSettingsLayoutFormGeneralView';
import PortalSettingsFormGeneralEdit from '../../../portal-settings/general/PortalSettingsFormGeneralEdit';

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
            imageHash: Date.now(),
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
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFinancial ? (
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
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        portalSettingsLayouts: state.systemData.portalSettingsLayouts,
    };
};

export default connect(mapStateToProps)(PortalSettingsLayoutFormGeneral);
