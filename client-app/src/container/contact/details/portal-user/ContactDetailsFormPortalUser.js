import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormPortalUserEdit from './ContactDetailsFormPortalUserEdit';
import ContactDetailsFormPortalUserView from './ContactDetailsFormPortalUserView';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import ContactDetailsFormOccupationsView from "../occupations/ContactDetailsFormOccupationsItem";
import ContactDetailsFormPortalUserDelete from "./ContactDetailsFormPortalUserDelete";

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
                </PanelHeader>
                <PanelBody>
                    {!this.props.portalUser ? (
                        <p>Niet geactiveerd</p>
                    ) : this.state.showEdit ? (
                        <ContactDetailsFormPortalUserEdit switchToView={this.switchToView} />
                    ) : (
                        <ContactDetailsFormPortalUserView
                            highlightLine={this.state.highlightLine}
                            showActionButtons={this.state.showActionButtons}
                            onLineEnter={this.onLineEnter}
                            onLineLeave={this.onLineLeave}
                            switchToEdit={this.switchToEdit}
                            toggleDelete={this.toggleDelete}  />
                    )}
                    {this.state.showDelete && (
                        <ContactDetailsFormPortalUserDelete
                            closeDeleteItemModal={this.toggleDelete}
                            deletePortalUser={this.deletePortalUser}
                            portalUser={this.state.portalUser}
                        />
                    )}
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        portalUser: state.contactDetails.portalUser,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactDetailsFormPortalUser);
