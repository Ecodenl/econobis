import React, { Component } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

import ProjectFormEdit from './edit/ProjectFormEdit';
import ProjectFormView from './view/ProjectFormView';

class ProjectFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            showCustomerPortalSettings: false,
            activeDiv: '',
        };
    }

    switchToEdit = () => {
        this.setState({
            showEdit: true,
            showCustomerPortalSettings: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
            showCustomerPortalSettings: false,
            activeDiv: '',
        });
    };

    toggleCustomerPortalSettings = () => {
        this.setState({
            showCustomerPortalSettings: !this.state.showCustomerPortalSettings,
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
        return (
            <Panel
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                <PanelBody>
                    {this.state.showEdit && this.props.permissions.manageProject ? (
                        <ProjectFormEdit
                            switchToView={this.switchToView}
                            showCustomerPortalSettings={this.state.showCustomerPortalSettings}
                            toggleCustomerPortalSettings={this.toggleCustomerPortalSettings}
                        />
                    ) : (
                        <ProjectFormView
                            switchToEdit={this.switchToEdit}
                            showCustomerPortalSettings={this.state.showCustomerPortalSettings}
                            toggleCustomerPortalSettings={this.toggleCustomerPortalSettings}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ProjectFormGeneral);
