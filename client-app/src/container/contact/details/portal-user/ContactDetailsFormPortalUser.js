import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormPortalUserEdit from './ContactDetailsFormPortalUserEdit';
import ContactDetailsFormPortalUserView from './ContactDetailsFormPortalUserView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import ContactDetailsFormPortalUserDelete from './ContactDetailsFormPortalUserDelete';

class ContactDetailsFormPortalUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
        };
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            showEdit: false,
        });
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Portal gebruiker gegevens</span>
                    {this.props?.portalUser?.blocked === true ? (
                        <span style={{ color: 'red' }}> Geblokkeerd</span>
                    ) : null}
                </PanelHeader>
                <PanelBody>
                    {!this.props.portalUser ? (
                        <div className="col-md-12">
                            <div>
                                <div>Niet geactiveerd</div>
                            </div>
                        </div>
                    ) : this.props.permissions.updateContactPortalUser && this.state.showEdit ? (
                        <ContactDetailsFormPortalUserEdit switchToView={this.switchToView} />
                    ) : (
                        <ContactDetailsFormPortalUserView
                            highlightLine={this.state.highlightLine}
                            showActionButtons={this.state.showActionButtons}
                            onLineEnter={this.onLineEnter}
                            onLineLeave={this.onLineLeave}
                            switchToEdit={this.switchToEdit}
                            toggleDelete={this.toggleDelete}
                        />
                    )}
                    {this.props.permissions.deleteContactPortalUser && this.state.showDelete && (
                        <ContactDetailsFormPortalUserDelete closeDeleteItemModal={this.toggleDelete} />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormPortalUser);
