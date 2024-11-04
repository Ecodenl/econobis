import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalFreeFieldsPagesDetailsFormGeneralEdit from './PortalFreeFieldsPagesDetailsFormGeneralEdit';
import PortalFreeFieldsPagesDetailsFormGeneralView from './PortalFreeFieldsPagesDetailsFormGeneralView';

class PortalFreeFieldsPagesDetailsFormGeneral extends Component {
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
        const { permissions = {} } = this.props;
        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.manageFreeFields ? (
                    <PortalFreeFieldsPagesDetailsFormGeneralEdit
                        portalFreeFieldsPage={this.props.portalFreeFieldsPage}
                        portalUrl={this.props.portalUrl}
                        switchToView={this.switchToView}
                        fetchPortalFreeFieldsPage={this.props.fetchPortalFreeFieldsPage}
                    />
                ) : (
                    <PortalFreeFieldsPagesDetailsFormGeneralView
                        {...this.props.portalFreeFieldsPage}
                        portalUrl={this.props.portalUrl}
                        switchToEdit={this.switchToEdit}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(PortalFreeFieldsPagesDetailsFormGeneral);
