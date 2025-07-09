import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { isEqual } from 'lodash';

import OccupationAPI from '../../../../api/contact/OccupationAPI';
import { fetchContactDetails } from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormOccupationsView from './ContactDetailsFormOccupationsView';
import ContactDetailsFormOccupationsEdit from './ContactDetailsFormOccupationsEdit';
import ContactDetailsFormOccupationsDelete from './ContactDetailsFormOccupationsDelete';
import moment from 'moment/moment';
moment.locale('nl');

class ContactDetailsFormOccupationsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            occupation: {
                ...props.occupation,
                primaryContactId: props.occupation.primaryContact.id,
                startDate: props.occupation.startDate ? props.occupation.startDate : '',
                endDate: props.occupation.endDate ? props.occupation.endDate : '',
                contactId: props.occupation.contact.id,
                selectedTypeId: props.occupation.contact.typeId ? props.occupation.contact.typeId : null,
                occupationId: props.occupation.occupation.id,
            },
            errors: {
                primaryContactIdError: false,
                occupationIdError: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.occupation, nextProps.occupation)) {
            this.setState({
                ...this.state,
                occupation: {
                    ...nextProps.occupation,
                    primaryContactId: nextProps.occupation.primaryContact.id,
                    startDate: nextProps.occupation.startDate ? nextProps.occupation.startDate : '',
                    endDate: nextProps.occupation.endDate ? nextProps.occupation.endDate : '',
                    contactId: nextProps.occupation.contact.id,
                    selectedTypeId: nextProps.occupation.contact.typeId ? nextProps.occupation.contact.typeId : null,
                    occupationId: nextProps.occupation.occupation.id,
                },
            });
        }
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

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            occupation: {
                ...this.props.occupation,
                primaryContactId: this.props.occupation.primaryContact.id,
                startDate: this.props.occupation.startDate ? this.props.occupation.startDate : '',
                endDate: this.props.occupation.endDate ? this.props.occupation.endDate : '',
                contactId: this.props.occupation.contact ? this.props.occupation.contact.id : '',
                occupationId: this.props.occupation.occupation ? this.props.occupation.occupation.id : '',
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                [name]: value,
            },
        });
    };

    handleInputChangePrimary = event => {
        const value = event.target.checked;

        let allowManageInPortal = this.state.occupation.allowManageInPortal;

        if (value === true && this.state.occupation.selectedTypeId) {
            if (this.state.occupation.selectedTypeId) {
                if (
                    (this.props.currentContactTypeId === 'organisation' &&
                        this.state.occupation.selectedTypeId === 'person') ||
                    (this.props.currentContactTypeId === 'person' &&
                        this.state.occupation.selectedTypeId === 'organisation')
                ) {
                    allowManageInPortal = true;
                }
            }
        }

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                primary: value,
                allowManageInPortal: allowManageInPortal,
            },
        });
    };
    handleStartDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                startDate: formattedDate,
            },
        });
    };

    handleEndDate = date => {
        const formattedDate = date ? moment(date).format('Y-MM-DD') : '';

        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                endDate: formattedDate,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { occupation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(occupation.primaryContactId + '')) {
            errors.primaryContactIdError = true;
            hasErrors = true;
        }

        if (validator.isEmpty(occupation.occupationId + '')) {
            errors.occupationIdError = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            OccupationAPI.updateOccupation(occupation).then(payload => {
                this.props.fetchContactDetails(this.props.id);

                this.closeEdit();
            });
    };

    deleteOccupation = occupation => {
        OccupationAPI.deleteOccupation(occupation).then(payload => {
            this.props.fetchContactDetails(this.props.id);
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            occupation: {
                ...this.state.occupation,
                [name]: selectedOption,
            },
        });
    }

    render() {
        return (
            <div>
                <ContactDetailsFormOccupationsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    occupation={this.state.occupation}
                    primaryOccupation={this.props.primaryOccupation}
                />
                {this.props.permissions.updateContactOccupation && this.state.showEdit && (
                    <ContactDetailsFormOccupationsEdit
                        occupation={this.state.occupation}
                        handleInputChange={this.handleInputChange}
                        handleInputChangePrimary={this.handleInputChangePrimary}
                        handleStartDate={this.handleStartDate}
                        handleEndDate={this.handleEndDate}
                        handleSubmit={this.handleSubmit}
                        primaryContactIdError={this.state.errors.primaryContactIdError}
                        occupationIdError={this.state.errors.occupationIdError}
                        cancelEdit={this.cancelEdit}
                        contacts={this.props.contacts}
                        peekLoading={this.props.peekLoading}
                        handleReactSelectChange={this.handleReactSelectChange}
                        primaryOccupation={this.props.primaryOccupation}
                    />
                )}
                {this.props.permissions.deleteContactOccupation && this.state.showDelete && (
                    <ContactDetailsFormOccupationsDelete
                        closeDeleteItemModal={this.toggleDelete}
                        deleteOccupation={this.deleteOccupation}
                        occupation={this.state.occupation}
                        primaryOccupation={this.props.primaryOccupation}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        id: state.contactDetails.id,
        currentContactTypeId: state.contactDetails.typeId,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormOccupationsItem);
